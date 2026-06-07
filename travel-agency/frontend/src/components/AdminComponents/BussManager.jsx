import { useState, useEffect, useCallback } from "react";
import "../../../src/index.css";

export default function BusManager() {
  const [buses, setBuses] = useState([]);
  const [editingBus, setEditingBus] = useState(null);

  const [newBus, setNewBus] = useState({
    busNumber: "",
    plateNumber: "",
    totalSeats: "",
    registrationExpiryDate: "",
    availableFrom: "",
    available: 1,
  });

  useEffect(() => {
  (async () => {
    const res = await fetch("http://localhost:3000/api/bus-routes/all-buses");
    const data = await res.json();
    setBuses(data.buses);
  })();
}, []);

  // ADD BUS
  const handleAddBus = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...newBus,
        totalSeats: Number(newBus.totalSeats),
        available: Number(newBus.available),
      };

      const res = await fetch("http://localhost:3000/api/bus-routes/add-bus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add bus");

      setNewBus({
        busNumber: "",
        plateNumber: "",
        totalSeats: "",
        registrationExpiryDate: "",
        availableFrom: "",
        available: 1,
      });

      fetchBuses();
    } catch (error) {
      console.error("Error adding bus:", error.message);
    }
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await fetch(
        `http://localhost:3000/api/bus-routes/update-bus/${editingBus.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingBus),
        },
      );

      setEditingBus(null);
      fetchBuses();
    } catch (error) {
      console.error("Error updating bus:", error.message);
    }
  };

  // DELETE BUS
  const deleteBus = async (plateNumber) => {
    try {
      await fetch(
        `http://localhost:3000/api/bus-routes/delete-bus/${plateNumber}`,
        {
          method: "DELETE",
        },
      );
      fetchBuses();
    } catch (error) {
      console.error("Error deleting bus:", error);
    }
  };

  return (
    <div className="text-white flex flex-col justify-center items-center w-full">
      {/* FORM */}
      <div className="flex justify-center">
        <form
          onSubmit={handleAddBus}
          className="flex flex-col w-[500px] gap-3 bg-[#1a2233] border border-white/10 rounded-xl px-6 py-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">Add New Bus</h2>

          <input
            type="text"
            value={newBus.busNumber}
            onChange={(e) =>
              setNewBus({ ...newBus, busNumber: e.target.value })
            }
            placeholder="Bus Number"
            className="p-3 rounded-lg bg-white/10 border border-white/10"
          />

          <input
            type="text"
            value={newBus.plateNumber}
            onChange={(e) =>
              setNewBus({ ...newBus, plateNumber: e.target.value })
            }
            placeholder="Plate Number"
            className="p-3 rounded-lg bg-white/10 border border-white/10"
          />

          <input
            type="number"
            value={newBus.totalSeats}
            onChange={(e) =>
              setNewBus({ ...newBus, totalSeats: e.target.value })
            }
            placeholder="Total Seats"
            className="p-3 rounded-lg bg-white/10 border border-white/10"
          />

          {/* LABEL + DATE 1 */}
          <label className="text-sm text-cyan-300">
            Registration Expiry Date
          </label>
          <input
            type="date"
            value={newBus.registrationExpiryDate}
            onChange={(e) =>
              setNewBus({
                ...newBus,
                registrationExpiryDate: e.target.value,
              })
            }
            className="p-3 rounded-lg bg-white/10 border border-white/10"
          />

          {/* AVAILABLE */}
          <label className="text-sm text-cyan-300">Available</label>

          <select
            value={newBus.available}
            onChange={(e) =>
              setNewBus({ ...newBus, available: Number(e.target.value) })
            }
            className="p-3 rounded-lg bg-white/10 border border-cyan-500/30 text-white
             focus:outline-none focus:border-cyan-400 transition"
          >
            <option value="Yes" className="bg-[#1a2233] text-green-400">
              YES
            </option>
            <option value="No" className="bg-[#1a2233] text-red-400">
              NO
            </option>
          </select>

          <label className="text-sm text-cyan-300 mt-2">
            Available From Date
          </label>

          <input
            type="date"
            value={newBus.availableFrom}
            onChange={(e) =>
              setNewBus({
                ...newBus,
                availableFrom: e.target.value,
              })
            }
            disabled={newBus.available === 0}
            className={`p-3 rounded-lg border transition
    ${
      newBus.available === 0
        ? "bg-gray-700/30 border-gray-600 cursor-not-allowed opacity-50"
        : "bg-white/10 border-white/10 focus:border-cyan-400"
    }`}
          />
          <button
            type="submit"
            className="mt-4 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-semibold"
          >
            Add Bus
          </button>
        </form>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-cyan-400">
        Available Buses
      </h2>

      <table className="w-full mt-4 border border-white/10 bg-white/5">
        <thead>
          <tr className="bg-white/10">
            <th className="p-4">Bus Number</th>
            <th className="p-4">Plate Number</th>
            <th className="p-4">Seats</th>
            <th className="p-4">Registration Expiry</th>
            <th className="p-4">Available</th>
            <th className="p-4">Available From</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id} className="border-t border-white/10">
              <td className="p-4">{bus.busNumber}</td>
              <td className="p-4">{bus.plateNumber}</td>
              <td className="p-4">{bus.totalSeats}</td>

              {/* DATE 1 */}
              <td className="p-4">
                {bus.registrationExpiryDate
                  ? new Date(bus.registrationExpiryDate).toLocaleDateString()
                  : "-"}
              </td>

              <td className="p-4">{bus.available === 'Yes' ? "YES" : "NO"}</td>

              {/* DATE 2 */}
              <td className="p-4">
                {bus.availableFrom
                  ? new Date(bus.availableFrom).toLocaleDateString()
                  : "-"}
              </td>

              <td className="p-4 flex gap-6 justify-center">
                <button
                  onClick={() => setEditingBus(bus)}
                  className="px-3 py-1 w-25  bg-cyan-500/20 text-cyan-300 rounded-3xl"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteBus(bus.plateNumber)}
                  className="px-3 py-1 bg-red-500/20 w-25 text-red-300 rounded-3xl"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {editingBus && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <form
            onSubmit={handleUpdate}
            className="bg-[#1a2233] p-6 rounded-xl w-[500px] flex flex-col gap-3"
          >
            <h3 className="text-xl font-bold text-cyan-400">Edit Bus</h3>

            <input
              className="w-full p-3 bg-white/10 rounded"
              placeholder="Bus Number"
              value={editingBus.busNumber}
              onChange={(e) =>
                setEditingBus({
                  ...editingBus,
                  busNumber: e.target.value,
                })
              }
              readOnly={true}
            />

            <input
              className="w-full p-3 bg-white/10 rounded"
              placeholder="Plate Number"
              value={editingBus.plateNumber}
              onChange={(e) =>
                setEditingBus({
                  ...editingBus,
                  plateNumber: e.target.value,
                })
              }
            />

            <input
              type="number"
              className="w-full p-3 bg-white/10 rounded"
              placeholder="Total Seats"
              value={editingBus.totalSeats}
              readOnly={true}
              onChange={(e) =>
                setEditingBus({
                  ...editingBus,
                  totalSeats: Number(e.target.value),
                })
              }
            />

            <label>Registration Expiry Date</label>

            <input
              type="date"
              className="w-full p-3 bg-white/10 rounded"
              value={
                editingBus.registrationExpiryDate
                  ? new Date(editingBus.registrationExpiryDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setEditingBus({
                  ...editingBus,
                  registrationExpiryDate: e.target.value,
                })
              }
            />

            <label>Available</label>
            <input
              type="date"
              className="w-full p-3 bg-white/10 rounded"
              value={
                editingBus.availableFrom
                  ? new Date(editingBus.availableFrom)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setEditingBus({
                  ...editingBus,
                  availableFrom: e.target.value,
                })
              }
            />

            <select
              className="w-full p-3 bg-white/10 rounded"
              value={editingBus.available}
              onChange={(e) =>
                setEditingBus({
                  ...editingBus,
                  available: Number(e.target.value),
                })
              }
            >
              <option value="Yes">YES</option>
              <option value="No">NO</option>
            </select>

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="bg-green-600 px-4 py-2 rounded flex-1"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => setEditingBus(null)}
                className="bg-gray-600 px-4 py-2 rounded flex-1"
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
