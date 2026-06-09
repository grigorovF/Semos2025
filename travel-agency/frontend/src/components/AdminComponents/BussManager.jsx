import { useState, useEffect, useCallback } from "react";
import "../../../src/index.css";

export default function BusManager() {
  const [busses, setBusses] = useState([]);
  const [editingBuss, setEditingBuss] = useState(null);

  const [newBuss, setNewBuss] = useState({
    busNumber: "",
    plateNumber: "",
    totalSeats: "",
    registrationExpiryDate: "",
    availableFrom: "",
    available: 1, 
  });

  const fetchBusses = useCallback(async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/buss-routes/all-busses",
      );
      const data = await res.json();
      setBusses(data.buses || []);
    } catch (error) {
      console.error("Error fetching buses:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchBusses();
  }, [fetchBusses]);

  const handleAddBuss = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newBuss,
        totalSeats: Number(newBuss.totalSeats),
        available: Number(newBuss.available),
      };

      const res = await fetch(
        "http://localhost:3000/api/buss-routes/add-buss",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add bus");

      setNewBuss({
        busNumber: "",
        plateNumber: "",
        totalSeats: "",
        registrationExpiryDate: "",
        availableFrom: "",
        available: 1,
      });

      fetchBusses();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/api/buss-routes/update-buss/${editingBuss.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingBuss),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update bus");

      setEditingBuss(null);
      fetchBusses();
    } catch (error) {
      alert("Error updating bus: " + error.message);
    }
  };

  const deleteBuss = async (plateNumber) => {
    if (!window.confirm("Are you sure you want to delete this bus?")) return;
    try {
      const res = await fetch(
        `http://localhost:3000/api/buss-routes/delete-buss/${plateNumber}`,
        { method: "DELETE" },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete bus");

      fetchBusses();
    } catch (error) {
      console.error("Error deleting bus:", error);
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  };

  return (
    <div className="text-white flex flex-col justify-center items-center w-full p-6">
      <div className="flex justify-center">
        <form
          onSubmit={handleAddBuss}
          className="flex flex-col w-125 gap-3 bg-[#1a2233] border border-white/10 rounded-xl px-6 py-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">Add New Bus</h2>

          <input
            type="text"
            value={newBuss.busNumber}
            onChange={(e) =>
              setNewBuss({ ...newBuss, busNumber: e.target.value })
            }
            placeholder="Bus Number"
            className="p-3 rounded-lg bg-white/10 border border-white/10 text-white"
          />

          <input
            type="text"
            value={newBuss.plateNumber}
            onChange={(e) =>
              setNewBuss({ ...newBuss, plateNumber: e.target.value })
            }
            placeholder="Plate Number"
            className="p-3 rounded-lg bg-white/10 border border-white/10 text-white"
          />

          <input
            type="number"
            value={newBuss.totalSeats}
            onChange={(e) =>
              setNewBuss({ ...newBuss, totalSeats: e.target.value })
            }
            placeholder="Total Seats"
            className="p-3 rounded-lg bg-white/10 border border-white/10 text-white"
          />

          <label className="text-sm text-cyan-300">
            Registration Expiry Date
          </label>
          <input
            type="date"
            value={newBuss.registrationExpiryDate}
            onChange={(e) =>
              setNewBuss({ ...newBuss, registrationExpiryDate: e.target.value })
            }
            className="p-3 rounded-lg bg-white/10 border border-white/10 text-white"
          />

          <label className="text-sm text-cyan-300">Available</label>
          <select
            value={newBuss.available}
            onChange={(e) =>
              setNewBuss({ ...newBuss, available: Number(e.target.value) })
            }
            className="p-3 rounded-lg bg-white/10 border border-cyan-500/30 text-white focus:outline-none focus:border-cyan-400 transition"
          >
            <option value={1} className="bg-[#1a2233] text-green-400">
              YES
            </option>
            <option value={0} className="bg-[#1a2233] text-red-400">
              NO
            </option>
          </select>

          <label className="text-sm text-cyan-300 mt-2">
            Available From Date
          </label>
          <input
            type="date"
            value={newBuss.availableFrom}
            onChange={(e) =>
              setNewBuss({ ...newBuss, availableFrom: e.target.value })
            }
            className="p-3 rounded-lg bg-white/10 border border-white/10 text-white"
          />

          <button
            type="submit"
            className="mt-4 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-semibold transition"
          >
            Add Bus
          </button>
        </form>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-cyan-400">
        Available Buses
      </h2>

      <table className="w-full max-w-6xl mt-4 border border-white/10 bg-white/5 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-white/10 text-left">
            <th className="p-4">Bus Number</th>
            <th className="p-4">Plate Number</th>
            <th className="p-4">Seats</th>
            <th className="p-4">Registration Expiry</th>
            <th className="p-4">Available</th>
            <th className="p-4">Available From</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {busses.map((buss) => (
            <tr
              key={buss.id}
              className="border-t border-white/10 hover:bg-white/5 transition"
            >
              <td className="p-4">{buss.id}</td>
              <td className="p-4">{buss.plateNumber}</td>
              <td className="p-4">{buss.totalSeats}</td>
              <td className="p-4">
                {buss.registrationExpiryDate
                  ? new Date(buss.registrationExpiryDate).toLocaleDateString()
                  : "-"}
              </td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    buss.available === "Yes"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {buss.available === "Yes" ? "YES" : "NO"}
                </span>
              </td>
              <td className="p-4">
                {buss.availableFrom
                  ? new Date(buss.availableFrom).toLocaleDateString()
                  : "-"}
              </td>
              <td className="p-4 flex gap-3 justify-center">
                <button
                  onClick={() => setEditingBuss(buss)}
                  className="px-4 py-1 bg-cyan-500/20 text-cyan-300 rounded-3xl hover:bg-cyan-500/40 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBuss(buss.plateNumber)}
                  className="px-4 py-1 bg-red-500/20 text-red-300 rounded-3xl hover:bg-red-500/40 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingBuss && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-[#1a2233] p-6 rounded-xl w-100 flex flex-col gap-3 border border-white/10"
          >
            <h3 className="text-xl font-bold text-cyan-400">Edit Bus</h3>

            <label className="text-xs text-gray-400">
              Bus Number
            </label>
            <input
              className="w-full p-3 bg-white/5 border border-white/10 rounded opacity-50 text-white"
              value={editingBuss.id || ""}
            />

            <label className="text-xs text-gray-400">Plate Number</label>
            <input
              className="w-full p-3 bg-white/10 border border-white/10 rounded text-white"
              value={editingBuss.plateNumber || ""}
              onChange={(e) =>
                setEditingBuss({ ...editingBuss, plateNumber: e.target.value })
              }
            />

            <label className="text-xs text-gray-400">
              Total Seats (Read-only)
            </label>
            <input
              type="number"
              className="w-full p-3 bg-white/5 border border-white/10 rounded opacity-50 cursor-not-allowed text-white"
              value={editingBuss.totalSeats || ""}
              readOnly
            />

            <label className="text-xs text-gray-400">
              Registration Expiry Date
            </label>
            <input
              type="date"
              className="w-full p-3 bg-white/10 border border-white/10 rounded text-white"
              value={formatDateForInput(editingBuss.registrationExpiryDate)}
              onChange={(e) =>
                setEditingBuss({
                  ...editingBuss,
                  registrationExpiryDate: e.target.value,
                })
              }
            />

            <label className="text-xs text-gray-400">Available From</label>
            <input
              type="date"
              className="w-full p-3 bg-white/10 border border-white/10 rounded text-white"
              value={formatDateForInput(editingBuss.availableFrom)}
              onChange={(e) =>
                setEditingBuss({
                  ...editingBuss,
                  availableFrom: e.target.value,
                })
              }
            />

            <label className="text-xs text-gray-400">Available Status</label>
            <select
              className="w-full p-3 bg-[#1a2233] border border-white/10 rounded text-white"
              value={editingBuss.available || "No"}
              onChange={(e) =>
                setEditingBuss({ ...editingBuss, available: e.target.value })
              }
            >
              <option value="Yes">YES</option>
              <option value="No">NO</option>
            </select>

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex-1 transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingBuss(null)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded flex-1 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
