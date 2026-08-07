import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";

import AdminLayout from "../layouts/AdminLayout";

function ViewRoutes() {
  const [routes, setRoutes] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchRoutes();
  }, []);

  useEffect(() => {
    const filtered = routes.filter((route) =>
      route.name.toLowerCase().includes(search.toLowerCase()) ||
      route.origin.toLowerCase().includes(search.toLowerCase()) ||
      route.destination.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredRoutes(filtered);
  }, [search, routes]);

  const fetchRoutes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/routes");
      const data = await response.json();

      setRoutes(data);
      setFilteredRoutes(data);
      setLoading(false);

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const deleteRoute = async (id) => {
    if (!window.confirm("Delete this route?")) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/routes/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }

      fetchRoutes();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>

      <div className="space-y-8">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              Routes
            </h1>

            <p className="text-gray-500 mt-2">
              View and manage all transport routes.
            </p>

          </div>

          <button
            onClick={() => navigate("/routes/add")}
            className="bg-green-700 text-white px-5 py-3 rounded-xl hover:bg-green-800 transition flex items-center gap-2"
          >
            <Plus size={18} />
            Add Route
          </button>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <div className="relative mb-6">

            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search routes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-700"
            />

          </div>

          {loading ? (

            <p>Loading...</p>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="text-left p-4">ID</th>
                    <th className="text-left p-4">Route</th>
                    <th className="text-left p-4">Origin</th>
                    <th className="text-left p-4">Destination</th>
                    <th className="text-left p-4">Operating Hours</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Actions</th>

                  </tr>

                </thead>

                <tbody>

                  {filteredRoutes.map((route) => (

                    <tr
                      key={route.id}
                      className="border-b hover:bg-gray-50 transition"
                    >

                      <td className="p-4">{route.id}</td>

                      <td className="p-4 font-semibold">
                        {route.name}
                      </td>

                      <td className="p-4">
                        {route.origin}
                      </td>

                      <td className="p-4">
                        {route.destination}
                      </td>

                      <td className="p-4">
                        {route.operating_hours}
                      </td>

                      <td className="p-4">

                        {route.verified ? (

                          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                            <CheckCircle size={16} />

                            Verified

                          </span>

                        ) : (

                          <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">

                            <XCircle size={16} />

                            Pending

                          </span>

                        )}

                      </td>

                      <td className="p-4">

                        <div className="flex gap-3">

                          <button
                            onClick={() =>
                              navigate(`/routes/edit/${route.id}`)
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() =>
                              deleteRoute(route.id)
                            }
                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>

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

export default ViewRoutes;