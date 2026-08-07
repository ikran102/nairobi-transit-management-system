import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await login(form.email, form.password);

      alert("Login successful!");

      navigate("/dashboard");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Panel */}

        <div className="bg-green-700 text-white p-12 flex flex-col justify-center">

          <h1 className="text-5xl font-bold mb-4">
            Nairobi Transit
          </h1>

          <p className="text-lg leading-8 text-green-100">
            Manage transport routes, stops and public transit
            information through one modern administration platform.
          </p>

          <div className="mt-10 space-y-3 text-green-100">

            <p>✓ Route Management</p>
            <p>✓ Stop Management</p>
            <p>✓ Passenger Navigation</p>

          </div>

        </div>

        {/* Right Panel */}

        <div className="p-12 flex flex-col justify-center">

          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-8">
            Sign in to your administrator account.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />

            </div>

            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-xl transition"
            >
              Sign In
            </button>

          </form>

          <p className="mt-8 text-center text-gray-600">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-green-700 font-semibold hover:underline"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;