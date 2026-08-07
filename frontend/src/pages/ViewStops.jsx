import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

function ViewStops() {
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchStops();
  }, []);

  const fetchStops = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/stops");
      const data = await response.json();

      setStops(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stops:", error);
      setLoading(false);
    }
  };

  const deleteStop = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this stop?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/stops/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to delete stop.");
        return;
      }

      fetchStops();

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  const filteredStops = stops.filter((stop) =>
    stop.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>

      <div className="space-y-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Stops
            </h1>

            <p className="text-gray-500 mt-1">
              Manage transport stops across all routes.
            </p>

          </div>

          <button
            onClick={() => navigate("/stops/add")}
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            Add Stop
          </button>

        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">

          <input
            type="text"
            placeholder="Search stops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 border border-gray-300 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          {loading ? (

            <p className="text-gray-500">
              Loading stops...
            </p>

          ) : filteredStops.length === 0 ? (

            <p className="text-gray-500">
              No stops found.
            </p>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="text-left px-4 py-3">ID</th>

                    <th className="text-left px-4 py-3">
                      Route ID
                    </th>

                    <th className="text-left px-4 py-3">
                      Stop Name
                    </th>

                    <th className="text-left px-4 py-3">
                      Latitude
                    </th>

                    <th className="text-left px-4 py-3">
                      Longitude
                    </th>

                    <th className="text-left px-4 py-3">
                      Sequence
                    </th>

                    <th className="text-left px-4 py-3">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredStops.map((stop) => (

                    <tr
                      key={stop.id}
                      className="border-b hover:bg-gray-50 transition"
                    >

                      <td className="px-4 py-4">
                        {stop.id}
                      </td>

                      <td className="px-4 py-4">
                        {stop.route_id}
                      </td>

                      <td className="px-4 py-4 font-semibold">
                        {stop.name}
                      </td>

                      <td className="px-4 py-4">
                        {stop.latitude}
                      </td>

                      <td className="px-4 py-4">
                        {stop.longitude}
                      </td>

                      <td className="px-4 py-4">
                        {stop.sequence}
                      </td>

                      <td className="px-4 py-4 space-x-2">

                        <button
                          onClick={() =>
                            navigate(`/stops/edit/${stop.id}`)
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteStop(stop.id)
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </AdminLayout>
  );
}

export default ViewStops;