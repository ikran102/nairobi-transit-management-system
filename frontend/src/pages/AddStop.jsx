import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

function AddStop() {
  const navigate = useNavigate();

  const [stop, setStop] = useState({
    routeId: "",
    name: "",
    latitude: "",
    longitude: "",
    sequence: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStop({
      ...stop,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stopData = {
      route_id: Number(stop.routeId),
      name: stop.name,
      latitude: parseFloat(stop.latitude),
      longitude: parseFloat(stop.longitude),
      sequence: Number(stop.sequence),
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/stops",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(stopData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Stop added successfully!");

        navigate("/stops");

      } else {
        alert(data.error || "Failed to add stop");
      }

    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend.");
    }
  };

  return (
    <AdminLayout>

      <div className="max-w-4xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Add New Stop
          </h1>

          <p className="text-gray-500 mt-2">
            Register a new stop for an existing transport route.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Route ID
              </label>

              <input
                type="number"
                name="routeId"
                value={stop.routeId}
                onChange={handleChange}
                placeholder="Enter Route ID"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />

            </div>

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stop Name
              </label>

              <input
                type="text"
                name="name"
                value={stop.name}
                onChange={handleChange}
                placeholder="e.g. Kencom Bus Stop"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Latitude
                </label>

                <input
                  type="number"
                  step="any"
                  name="latitude"
                  value={stop.latitude}
                  onChange={handleChange}
                  placeholder="-1.286389"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                />

              </div>

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Longitude
                </label>

                <input
                  type="number"
                  step="any"
                  name="longitude"
                  value={stop.longitude}
                  onChange={handleChange}
                  placeholder="36.817223"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                />

              </div>

            </div>

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stop Sequence
              </label>

              <input
                type="number"
                name="sequence"
                value={stop.sequence}
                onChange={handleChange}
                placeholder="1"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />

            </div>

            <div className="flex justify-end gap-4 pt-4">

              <button
                type="button"
                onClick={() => navigate("/stops")}
                className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white font-semibold transition"
              >
                Save Stop
              </button>

            </div>

          </form>

        </div>

      </div>

    </AdminLayout>
  );
}

export default AddStop;