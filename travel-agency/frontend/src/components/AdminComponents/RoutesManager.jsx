import { useCallback, useEffect, useState } from "react";
import "../../../src/index.css";

export default function RoutesManager() {
  const [routes, setRoutes] = useState([]);
  const [editingRouteId, setEditingRouteId] = useState(null);

  const [newRoute, setNewRoute] = useState({
    startCity: "",
    endCity: "",
    totalPrice: "",
  });

  const [stops, setStops] = useState([]);

  const fetchRoutes = useCallback(async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/route-routes/all-routes",
      );
      const data = await res.json();
      setRoutes(data);
    } catch (error) {
      console.error("Error fetching routes", error.message);
    }
  }, []);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

  const addStopField = () => {
    const nextOrder = stops.length + 1;
    const newStop = {
      cityName: "",
      stopOrder: nextOrder,
      arrivalTime: "",
      departureTime: "",
      platform: "",
      priceFromStart: "", 
    };
    setStops([...stops, newStop]);
  };

  const handleStopChange = (index, field, value) => {
    const updatedStops = [...stops];
    updatedStops[index][field] = value;
    setStops(updatedStops);
  };

  const removeStopField = (indexToRemove) => {
    const filteredStops = stops.filter((_, index) => index !== indexToRemove);
    const reorderedStops = filteredStops.map((stop, index) => ({
      ...stop,
      stopOrder: index + 1,
    }));
    setStops(reorderedStops);
  };

  const handleEditClick = (route) => {
    setEditingRouteId(route.id);
    setNewRoute({
      startCity: route.startCity,
      endCity: route.endCity,
      totalPrice: route.totalPrice,
    });

    const formattedStops = route.stops.map((stop) => ({
      ...stop,
      arrivalTime: stop.arrivalTime ? stop.arrivalTime.substring(0, 16) : "",
      departureTime: stop.departureTime
        ? stop.departureTime.substring(0, 16)
        : "",
      priceFromStart: stop.priceFromStart || 0, 
    }));
    setStops(formattedStops);
  };

  const handleCancelEdit = () => {
    setEditingRouteId(null);
    setNewRoute({ startCity: "", endCity: "", totalPrice: "" });
    setStops([]);
  };

  const handleDeleteRoute = async (routeId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this route? This will also remove its stops.",
      )
    )
      return;
    try {
      const res = await fetch(
        `http://localhost:3000/api/route-routes/delete-route/${routeId}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete route");
      fetchRoutes();
    } catch (error) {
      alert(`Error deleting route: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      startCity: String(newRoute.startCity),
      endCity: String(newRoute.endCity),
      totalPrice: Number(newRoute.totalPrice),
      stops: stops.map((s) => ({
        ...s,
        priceFromStart: Number(s.priceFromStart),
      })),
    };

    const url = editingRouteId
      ? `http://localhost:3000/api/route-routes/update-route/${editingRouteId}`
      : "http://localhost:3000/api/route-routes/add-route";

    const method = editingRouteId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save route");

      setEditingRouteId(null);
      setNewRoute({ startCity: "", endCity: "", totalPrice: "" });
      setStops([]);
      fetchRoutes();
    } catch (error) {
      alert(`Error saving route: ${error.message}`);
    }
  };

  return (
    <div className="text-white flex flex-col justify-center items-center w-full p-6">
      <div className="flex justify-center w-full max-w-5xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-4 bg-[#1a2233] border border-white/10 rounded-xl px-6 py-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-2 text-cyan-400">
            {editingRouteId ? "Edit Route" : "Add New Route"}
          </h2>
          <div className="grid grid-cols-3 gap-4">
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
            <input
              type="number"
              min="0"
              step="0.01"
              value={newRoute.totalPrice}
              onChange={(e) =>
                setNewRoute({ ...newRoute, totalPrice: e.target.value })
              }
              placeholder="Total Route Price (€)"
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
              className="grid grid-cols-6 gap-2 items-center bg-white/5 p-3 rounded-lg border border-white/5 relative"
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

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-400 pl-1">
                  Arrival Time
                </label>
                <input
                  type="datetime-local"
                  value={stop.arrivalTime}
                  onChange={(e) =>
                    handleStopChange(index, "arrivalTime", e.target.value)
                  }
                  className="p-2 rounded bg-white/10 text-sm border border-white/10 focus:outline-none focus:border-cyan-400 text-white scheme-dark"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-400 pl-1">
                  Departure Time
                </label>
                <input
                  type="datetime-local"
                  value={stop.departureTime}
                  onChange={(e) =>
                    handleStopChange(index, "departureTime", e.target.value)
                  }
                  className="p-2 rounded bg-white/10 text-sm border border-white/10 focus:outline-none focus:border-cyan-400 text-white scheme-dark"
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Platform"
                value={stop.platform}
                onChange={(e) =>
                  handleStopChange(index, "platform", e.target.value)
                }
                className="p-2 rounded bg-white/10 text-sm border border-white/10 focus:outline-none focus:border-cyan-400 self-end mb-0.5"
                required
              />

              {/* НОВ ИНПУТ ЗА ЦЕНА ДО ТАА ПОСТОЈКА */}
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Price from start (€)"
                value={stop.priceFromStart}
                onChange={(e) =>
                  handleStopChange(index, "priceFromStart", e.target.value)
                }
                className="p-2 rounded bg-white/10 text-sm border border-white/10 focus:outline-none focus:border-cyan-400 self-end mb-0.5"
                required
              />

              <button
                type="button"
                onClick={() => removeStopField(index)}
                className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded transition text-sm font-bold self-end mb-0.5 h-38px"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={addStopField}
              className="px-4 py-2 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-lg transition text-sm font-semibold"
            >
              + Add Stop
            </button>
            {editingRouteId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10 rounded-lg transition text-sm font-semibold"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-semibold transition"
          >
            {editingRouteId ? "Update Full Route" : "Save Full Route"}
          </button>
        </form>
      </div>

      <div className="mt-8 w-full max-w-6xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-cyan-500/20 text-left">
              <th className="p-4 font-semibold text-cyan-300">Departure</th>
              <th className="p-4 font-semibold text-cyan-300">Arrival</th>
              <th className="p-4 font-semibold text-cyan-300">Total Price</th>
              <th className="p-4 font-semibold text-cyan-300">Stops</th>
              <th className="p-4 font-semibold text-cyan-300 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {routes.map((route) => (
              <tr
                key={route.id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="p-4">{route.startCity}</td>
                <td className="p-4">{route.endCity}</td>
                <td className="p-4">{route.totalPrice} €</td>
                <td className="p-4">
                  <details className="cursor-pointer select-none">
                    <summary className="font-medium text-cyan-400 hover:text-cyan-300 transition">
                      {route.stops ? route.stops.length : 0} stops
                    </summary>
                    <div className="mt-2 pl-2 border-l border-white/10 space-y-2">
                      {route.stops &&
                        route.stops.map((stop) => (
                          <div
                            key={stop.id}
                            className="text-sm text-gray-400 bg-white/5 p-2 rounded"
                          >
                            <div className="flex justify-between font-semibold text-white">
                              <span>
                                {stop.cityName} (Order: {stop.stopOrder})
                              </span>
                              <span className="text-cyan-400">
                                Cum. Price: {stop.priceFromStart} €
                              </span>
                            </div>
                            <div className="text-xs mt-1 text-gray-500">
                              Platform: {stop.platform}
                            </div>
                            <div className="text-xs text-gray-500">
                              Arrival: {stop.arrivalTime}
                            </div>
                            <div className="text-xs text-gray-500">
                              Departure: {stop.departureTime}
                            </div>
                          </div>
                        ))}
                    </div>
                  </details>
                </td>
                <td className="p-4 flex gap-3 justify-center items-center">
                  <button
                    onClick={() => handleEditClick(route)}
                    className="px-4 py-1 bg-cyan-500/20 text-cyan-300 rounded-3xl hover:bg-cyan-500/40 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRoute(route.id)}
                    className="px-4 py-1 bg-red-500/20 text-red-300 rounded-3xl hover:bg-red-500/40 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
