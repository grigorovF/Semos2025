import { useCallback, useEffect, useState } from "react";

export default function TripsManager() {
  const [trips, setTrips] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [availableBuses, setAvailableBuses] = useState([]);

  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceCount, setRecurrenceCount] = useState(1);
  const [stops, setStops] = useState([]);

  const [newTrip, setNewTrip] = useState({
    routeId: "",
    busId: "",
    departureDateTime: "",
  });

  const [selectedRouteDetails, setSelectedRouteDetails] = useState(null);

  const fetchTrips = useCallback(async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/trip-routes/all-trips",
      );
      const data = await res.json();
      setTrips(data.trips || []);
    } catch (error) {
      console.error("Грешка при преземање на патувањата: ", error.message);
    }
  }, []);

  const fetchTripsStops = useCallback(async (routeId) => {
    try {
      console.log(routeId);
      const res = await fetch(
        `http://localhost:3000/api/trip-routes/trip-stops/${routeId}`,{method: 'POST'}
      );
      const data = await res.json();
      setStops(data.stops || []);
    } catch (error) {
      console.error("Error fetching routes stops: ", error.message);
    }
  }, []);


  const fetchRoutes = useCallback(async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/route-routes/all-routes",
      );
      const data = await res.json();
      setRoutes(data || []);
    } catch (error) {
      console.error("Error fetching routes: ", error.message);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
    fetchRoutes();
  }, [fetchTrips, fetchRoutes]);
  const handleRouteChange = (e) => {
    const rId = e.target.value;

    setNewTrip((prev) => ({
      ...prev,
      routeId: rId,
      busId: "",
    }));

    if (rId) {
      fetchTripsStops(rId);

      const selected = routes.find((r) => r.id === Number(rId));

      setSelectedRouteDetails(selected);
    } else {
      setSelectedRouteDetails(null);
      setStops([]);
    }
  };
  useEffect(() => {
    const fetchAvailableBuses = async () => {
      if (newTrip.routeId && newTrip.departureDateTime) {
        try {
          const res = await fetch(
            "http://localhost:3000/api/trip-routes/avaiable-busses",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                routeId: Number(newTrip.routeId),
                departureDateTime: newTrip.departureDateTime,
              }),
            },
          );
          if (!res.ok) throw new Error("Неуспешно пребарување автобуси");
          const data = await res.json();
          setAvailableBuses(data);
        } catch (error) {
          console.error("Грешка при преземање автобуси: ", error.message);
        }
      } else {
        setAvailableBuses([]);
      }
    };

    fetchAvailableBuses();
  }, [newTrip.routeId, newTrip.departureDateTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        routeId: Number(newTrip.routeId),
        busId: newTrip.busId ? Number(newTrip.busId) : null,
        departureDateTime: newTrip.departureDateTime,
        recurrenceCount: isRecurring ? Number(recurrenceCount) : 1,
      };

      const res = await fetch(
        "http://localhost:3000/api/trip-routes/schedule-trip",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Trip creating error");

      alert(data.message || "Trip successfuly created!");

      // Ресетирање на формата
      setNewTrip({
        routeId: "",
        busId: "",
        departureDateTime: "",
      });
      setIsRecurring(false);
      setRecurrenceCount(1);
      setSelectedRouteDetails(null);
      fetchTrips();
    } catch (error) {
      alert("Грешка: " + error.message);
    }
  };

  return (
    <div className="text-white flex flex-col justify-center items-center w-full p-6">
      <div className="flex justify-center w-full max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-4 bg-[#1a2233] border border-white/10 rounded-xl px-6 py-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-2 text-cyan-400">
            Schedule Trip (Smart Auto-Pilot)
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {/* ИЗБОР НА РУТА */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-cyan-300">
                Select Route Template
              </label>
              <select
                value={newTrip.routeId}
                onChange={handleRouteChange}
                className="p-3 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                required
              >
                <option value="" className="bg-[#1a2233]">
                  -- Select Route --
                </option>
                {routes.map((route) => (
                  <option
                    key={route.id}
                    value={route.id}
                    className="bg-[#1a2233]"
                  >
                    {route.startCity} - {route.endCity}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-cyan-300">
                Departure Date & Time
              </label>
              <input
                type="datetime-local"
                value={newTrip.departureDateTime}
                onChange={(e) =>
                  setNewTrip({ ...newTrip, departureDateTime: e.target.value })
                }
                className="p-3 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:border-cyan-400 scheme-dark"
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10 mt-2">
            <input
              type="checkbox"
              id="repeatDaily"
              checked={isRecurring}
              onChange={(e) => {
                setIsRecurring(e.target.checked);
                if (!e.target.checked) {
                  setRecurrenceCount(1);
                } else {
                  setRecurrenceCount(2);
                }
              }}
              className="w-5 h-5 accent-cyan-400 cursor-pointer"
            />
            <label
              htmlFor="repeatDaily"
              className="text-sm text-cyan-300 font-semibold cursor-pointer select-none"
            >
              Daily Recurrence
            </label>

            {isRecurring && (
              <div className="flex items-center gap-2 ml-auto">
                <label className="text-xs text-gray-400">Day numbef:</label>
                <input
                  type="number"
                  min="2"
                  max="31"
                  value={recurrenceCount}
                  onChange={(e) =>
                    setRecurrenceCount(
                      Math.min(31, Math.max(2, Number(e.target.value))),
                    )
                  }
                  className="w-20 p-2 rounded bg-white/10 border border-white/10 text-white text-center font-bold focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>
            )}
          </div>

          {/* ИНФОРМАЦИИ ЗА ИЗБРАНАТА РУТА */}
          {selectedRouteDetails && (
            <div className="bg-cyan-500/10 border border-cyan-500/25 p-4 rounded-xl mt-2 flex flex-col gap-2">
              <h4 className="text-md font-bold text-cyan-400">Route Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <p>
                    🛣️{" "}
                    <span className="font-semibold text-white">Relation:</span>{" "}
                    {selectedRouteDetails.startCity} ➡️{" "}
                    {selectedRouteDetails.endCity}
                  </p>
                  <p>
                    💶{" "}
                    <span className="font-semibold text-white">
                      Ticket Price:
                    </span>{" "}
                    {selectedRouteDetails.totalPrice} €
                  </p>
                </div>
                <div>
                  <p>
                    📍 <span className="font-semibold text-white">Stops: </span>
                    <span>
                      {stops.map((stop) => stop.cityName).join(" → " )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1 mt-2">
            <label className="text-sm text-cyan-300">
              Select available buss
              {!newTrip.routeId || !newTrip.departureDateTime}
            </label>
            <select
              value={newTrip.busId}
              onChange={(e) =>
                setNewTrip({ ...newTrip, busId: e.target.value })
              }
              className="p-3 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              disabled={!newTrip.routeId || !newTrip.departureDateTime}
              required={!isRecurring || recurrenceCount === 1}
            >
              <option value="" className="bg-[#1a2233]">
                {isRecurring && recurrenceCount > 1
                  ? "-- Автоматска распределба на слободни автобуси за секој ден --"
                  : availableBuses.length === 0
                    ? "-- There is no available busses --"
                    : "-- Select buss --"}
              </option>
              {(!isRecurring || recurrenceCount === 1) &&
                availableBuses.map((bus) => (
                  <option key={bus.id} value={bus.id} className="bg-[#1a2233]">
                    {bus.busNumber} [{bus.plateNumber}] - ({bus.totalSeats}{" "}
                    седишта)
                  </option>
                ))}
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-semibold transition"
          >
            {isRecurring
              ? `Schedule ${recurrenceCount} Consecutive Trips`
              : "Create Scheduled Trip"}
          </button>
        </form>
      </div>
      <h2 className="mt-10 text-2xl font-bold text-cyan-400">
        Scheduled Trips
      </h2>
      <div className="mt-4 w-full max-w-6xl overflow-x-auto">
        <table className="w-full border-collapse border border-white/10 bg-white/5 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-cyan-500/20 text-left">
              <th className="p-4 font-semibold text-cyan-300">Route</th>
              <th className="p-4 font-semibold text-cyan-300">Bus Plate</th>
              <th className="p-4 font-semibold text-cyan-300">Departure</th>
              <th className="p-4 font-semibold text-cyan-300">
                Arrival (Auto-Calculated)
              </th>
              <th className="p-4 font-semibold text-cyan-300">Ticket Price</th>
            </tr>
          </thead>
          <tbody>
            {trips.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="p-8 text-center text-gray-500 font-semibold"
                >
                  There are no booked trips
                </td>
              </tr>
            ) : (
              trips.map((trip) => (
                <tr
                  key={trip.id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-4 font-semibold">{trip.routeName}</td>
                  <td className="p-4">
                    {trip.plateNumber} (Bus: #{trip.busNumber})
                  </td>
                  <td className="p-4">
                    {new Date(trip.departureDateTime).toLocaleString()}
                  </td>
                  <td className="p-4">
                    {new Date(trip.arrivalDateTime).toLocaleString()}
                  </td>
                  <td className="p-4 text-cyan-400 font-bold">
                    {trip.basePrice} €
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
