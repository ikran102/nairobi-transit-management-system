import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

function AddRoute() {

  const [route, setRoute] = useState({
    name: "",
    origin: "",
    destination: "",
    operatingHours: "",
    verified: false,
  });


  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setRoute({
      ...route,
      [name]: type === "checkbox" ? checked : value,
    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    // Convert frontend data to backend format
    const routeData = {

      name: route.name,

      origin: route.origin,

      destination: route.destination,

      operating_hours: route.operatingHours,

      verified: route.verified,

    };


    try {

      const response = await fetch(
        "http://127.0.0.1:5000/api/routes",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(routeData),
        }
      );


      const data = await response.json();



      if (response.ok) {

        console.log("Route saved:", data);

        alert("Route added successfully!");


        // Clear form

        setRoute({

          name: "",

          origin: "",

          destination: "",

          operatingHours: "",

          verified: false,

        });


      } else {

        console.error("Backend error:", data);

        alert(
          data.error || "Failed to add route"
        );

      }



    } catch (error) {

      console.error(
        "Connection error:",
        error
      );

      alert(
        "Cannot connect to backend server"
      );

    }

  };



  return (
  <AdminLayout>
    <div className="max-w-4xl mx-auto">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Add New Route
        </h1>

        <p className="text-gray-500 mt-2">
          Create and register a new transport route.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Route Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="e.g. Route 46"
              value={route.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Origin
              </label>

              <input
                type="text"
                name="origin"
                placeholder="Nairobi CBD"
                value={route.origin}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Destination
              </label>

              <input
                type="text"
                name="destination"
                placeholder="Rongai"
                value={route.destination}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 focus:outline-none"
              />
            </div>

          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Operating Hours
            </label>

            <input
              type="text"
              name="operatingHours"
              placeholder="5:00 AM - 10:00 PM"
              value={route.operatingHours}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              id="verified"
              name="verified"
              checked={route.verified}
              onChange={handleChange}
              className="w-5 h-5 accent-green-700"
            />

            <label
              htmlFor="verified"
              className="text-gray-700"
            >
              Verified Route
            </label>

          </div>

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white font-semibold transition"
            >
              Save Route
            </button>

          </div>

        </form>

      </div>

    </div>
  </AdminLayout>
);

}


export default AddRoute;