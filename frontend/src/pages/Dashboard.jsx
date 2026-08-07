import {
  Route,
  MapPinned,
  Clock3,
  Plus,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

function Dashboard() {
  const username = localStorage.getItem("username") || "Administrator";

  return (
    <AdminLayout>

      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-4xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back, {username}. Here's an overview of the Nairobi
            Transit Management System.
          </p>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-lg transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500 uppercase text-sm">
                  Total Routes
                </p>

                <h2 className="text-5xl font-bold text-green-700 mt-3">
                  120
                </h2>

                <p className="text-gray-500 mt-3">
                  Registered transport routes
                </p>

              </div>

              <div className="bg-green-100 p-4 rounded-2xl">
                <Route size={30} className="text-green-700" />
              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-lg transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500 uppercase text-sm">
                  Total Stops
                </p>

                <h2 className="text-5xl font-bold text-green-700 mt-3">
                  850
                </h2>

                <p className="text-gray-500 mt-3">
                  Bus stops available
                </p>

              </div>

              <div className="bg-blue-100 p-4 rounded-2xl">
                <MapPinned size={30} className="text-blue-700" />
              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-lg transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500 uppercase text-sm">
                  Pending Reviews
                </p>

                <h2 className="text-5xl font-bold text-orange-600 mt-3">
                  18
                </h2>

                <p className="text-gray-500 mt-3">
                  Awaiting administrator review
                </p>

              </div>

              <div className="bg-orange-100 p-4 rounded-2xl">
                <Clock3 size={30} className="text-orange-600" />
              </div>

            </div>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="bg-white rounded-2xl shadow-sm border p-8">

          <div className="flex justify-between items-center mb-6">

            <div>

              <h2 className="text-2xl font-bold">
                Quick Actions
              </h2>

              <p className="text-gray-500">
                Frequently used administrator actions.
              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-5">

            <Link
              to="/routes/add"
              className="border rounded-xl p-6 hover:bg-green-50 hover:border-green-600 transition"
            >

              <Plus className="text-green-700 mb-4" />

              <h3 className="font-semibold text-lg">
                Add Route
              </h3>

              <p className="text-gray-500 mt-2">
                Register a new transport route.
              </p>

            </Link>

            <Link
              to="/stops/add"
              className="border rounded-xl p-6 hover:bg-green-50 hover:border-green-600 transition"
            >

              <Plus className="text-green-700 mb-4" />

              <h3 className="font-semibold text-lg">
                Add Stop
              </h3>

              <p className="text-gray-500 mt-2">
                Add a new bus stop.
              </p>

            </Link>

            <Link
              to="/routes"
              className="border rounded-xl p-6 hover:bg-green-50 hover:border-green-600 transition"
            >

              <ArrowRight className="text-green-700 mb-4" />

              <h3 className="font-semibold text-lg">
                View Routes
              </h3>

              <p className="text-gray-500 mt-2">
                View, edit or remove existing routes.
              </p>

            </Link>

          </div>

        </div>

        {/* Recent Activity */}

        <div className="bg-white rounded-2xl shadow-sm border p-8">

          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between items-center border-b pb-4">

              <div>

                <p className="font-semibold">
                  Route 46 added successfully
                </p>

                <p className="text-gray-500 text-sm">
                  Administrator
                </p>

              </div>

              <span className="text-gray-400">
                Today
              </span>

            </div>

            <div className="flex justify-between items-center border-b pb-4">

              <div>

                <p className="font-semibold">
                  New stop added in Westlands
                </p>

                <p className="text-gray-500 text-sm">
                  Administrator
                </p>

              </div>

              <span className="text-gray-400">
                Today
              </span>

            </div>

            <div className="flex justify-between items-center">

              <div>

                <p className="font-semibold">
                  Passenger suggestion approved
                </p>

                <p className="text-gray-500 text-sm">
                  Administrator
                </p>

              </div>

              <span className="text-gray-400">
                Yesterday
              </span>

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

export default Dashboard;