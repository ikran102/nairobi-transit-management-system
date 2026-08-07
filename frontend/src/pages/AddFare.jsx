import { useEffect, useState } from "react";

function AddFare() {
  const [routes, setRoutes] = useState([]);

  const [form, setForm] = useState({
    route_id: "",
    min_fare: "",
    max_fare: "",
    time_of_day: "Off Peak",
  });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/routes");
      const data = await response.json();
      setRoutes(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/fares",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      alert(data.message);

      setForm({
        route_id: "",
        min_fare: "",
        max_fare: "",
        time_of_day: "Off Peak",
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">

      <h1 className="text-3xl font-bold mb-6">
        Add Fare
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>
          <label className="block mb-2 font-medium">
            Route
          </label>

          <select
            name="route_id"
            value={form.route_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">
              Select Route
            </option>

            {routes.map((route) => (
              <option
                key={route.id}
                value={route.id}
              >
                {route.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Minimum Fare
          </label>

          <input
            type="number"
            name="min_fare"
            value={form.min_fare}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Maximum Fare
          </label>

          <input
            type="number"
            name="max_fare"
            value={form.max_fare}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Time of Day
          </label>

          <select
            name="time_of_day"
            value={form.time_of_day}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Peak</option>
            <option>Off Peak</option>
          </select>
        </div>

        <button
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg"
        >
          Save Fare
        </button>

      </form>

    </div>
  );
}

export default AddFare;