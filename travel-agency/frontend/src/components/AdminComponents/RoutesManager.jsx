import { useCallback, useEffect, useState } from "react"
import "../../../src/index.css"

export default function RoutesManager(){
    const [routes, setRoutes] = useState([]);
    const [trips, setTrips] = useState([])
    const [stops, setStops] = useState([]);
    const [editingRoute, setEditingRoute] = useState(null);

    const [newRoute, setNewRoute] = useState({
        startCity: "",
        endCity: "",
        stops: []
    });

    
    const fetchRoutes = useCallback(async () =>{
        try{
            const res = await fetch(
              "http://localhost:3000/api/route-routes/all-routes",
            );
            const data = await res.json();
            setRoutes(data)
        }

        catch(error){
            console.error("Error fetching routes", error.message);            
        }
    }, []);

    useEffect(() => {
        fetchRoutes();
    }, [fetchRoutes]);

    const addStopField = () =>{
        const nextOrder = stops.length() + 1;
        const newStop = {
            cityName: "",
            stopOrder: nextOrder,
            arrivalTime: "",
            departureTime: "",
            platform: "",
        };

        setStops([...stops, newStop]);
    }

    //handle stop change

    const handleAddRoute  = async(e) =>{
        e.preventDefault();

        try{
            const payload = {
                ...newRoute,
                startCity: String(newRoute.startCity),
                endCity: String(newRoute.endCity),
                stops: newRoute.stops || []
            }

            const res = await fetch(
              "http://localhost:3000/api/route-routes/add-route",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              },
            );

            const data = await res.json();
            if(!res.ok) 
                throw new Error("Failed to add route" + data.error);

            setNewRoute({
              startCity: "",
              endCity: "",
              stops: []
            });

            fetchRoutes();
        }
        catch(error){
            alert(`Error adding route: ${error.message}`);            
        }
    }

    return (
      <div className="text-white flex flex-col justify-center items-center w-full p-6">
        <div className="flex justify-center w-full max-w-4xl">
          <form
            onSubmit={handleAddRoute}
            className="flex flex-col w-full gap-4 bg-[#1a2233] border border-white/10 rounded-xl px-6 py-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-2 text-cyan-400">
              Add New Route
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={newRoute.startCity}
                onChange={(e) =>
                  setNewRoute({ ...newRoute, startCity: e.target.value })
                }
                placeholder="Start City (e.g. Skopje)"
                className="p-3 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                required
              />
              <input
                type="text"
                value={newRoute.endCity}
                onChange={(e) =>
                  setNewRoute({ ...newRoute, endCity: e.target.value })
                }
                placeholder="End City (e.g. Berlin)"
                className="p-3 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <hr className="border-white/10 my-2" />

            <h3 className="text-lg font-semibold text-cyan-300">
              Intermediate Stops
            </h3>

            {stops.map((stop, index) => (
              <div
                key={index}
                className="grid grid-cols-5 gap-2 items-center bg-white/5 p-3 rounded-lg border border-white/5 relative"
              >
                <span className="absolute -left-2 -top-2 bg-cyan-500 text-xs px-2 py-0.5 rounded-full font-bold">
                  {stop.stopOrder}
                </span>

                <input
                  type="text"
                  placeholder="City Name"
                  value={stop.cityName}
                  onChange={(e) =>
                    handleStopChange(index, "cityName", e.target.value)
                  }
                  className="p-2 rounded bg-white/10 text-sm border border-white/10 focus:outline-none focus:border-cyan-400"
                  required
                />

                <input
                  type="text"
                  placeholder="Arrival (HH:MM)"
                  value={stop.arrivalTime}
                  onChange={(e) =>
                    handleStopChange(index, "arrivalTime", e.target.value)
                  }
                  className="p-2 rounded bg-white/10 text-sm border border-white/10 focus:outline-none focus:border-cyan-400"
                  required
                />

                <input
                  type="text"
                  placeholder="Departure (HH:MM)"
                  value={stop.departureTime}
                  onChange={(e) =>
                    handleStopChange(index, "departureTime", e.target.value)
                  }
                  className="p-2 rounded bg-white/10 text-sm border border-white/10 focus:outline-none focus:border-cyan-400"
                  required
                />

                <input
                  type="text"
                  placeholder="Platform"
                  value={stop.platform}
                  onChange={(e) =>
                    handleStopChange(index, "platform", e.target.value)
                  }
                  className="p-2 rounded bg-white/10 text-sm border border-white/10 focus:outline-none focus:border-cyan-400"
                  required
                />
                 <button
                  type="button"
                  onClick={() => removeStopField(index)}
                  className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded transition text-sm font-bold"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addStopField}
              className="mt-2 self-start px-4 py-2 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-lg transition text-sm font-semibold"
            >
              + Add Stop
            </button>

            <button
              type="submit"
              className="mt-4 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-semibold transition"
            >
              Save Full Route
            </button>
          </form>
        </div>
      </div>
    );
}