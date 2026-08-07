import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navigation */}
      <nav className="flex items-center justify-between px-10 py-5 bg-white shadow-sm">

        <h1 className="text-3xl font-bold text-emerald-700">
          Nairobi Transit
        </h1>

        <div className="space-x-4">

          <Link
            to="/passenger"
            className="px-5 py-2 rounded-lg text-slate-700 hover:text-emerald-600 font-medium"
          >
            Passenger Portal
          </Link>

          <Link
            to="/login"
            className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            Admin Login
          </Link>

        </div>

      </nav>

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-10 py-20">

        <div className="grid md:grid-cols-2 items-center gap-16">

          <div>

            <h2 className="text-6xl font-black text-slate-900 leading-tight">
              Smarter Public Transport
              <span className="text-emerald-600"> for Nairobi</span>
            </h2>

            <p className="mt-8 text-xl text-slate-600 leading-9">

              Search routes, view stops, estimate fares,
              and discover the fastest matatu routes across Nairobi.

            </p>

            <div className="flex gap-5 mt-10">

              <Link
                to="/passenger"
                className="bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-700"
              >
                Find My Route
              </Link>

              <Link
                to="/login"
                className="border border-slate-300 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-100"
              >
                Administrator
              </Link>

            </div>

          </div>

          <div>

            <img
              src="https://images.unsplash.com/photo-1514565131-fce0801e5785?w=900"
              alt="Public Transport"
              className="rounded-3xl shadow-2xl"
            />

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-10">

          <h2 className="text-4xl font-bold text-center mb-14">
            Why Nairobi Transit?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-slate-50 rounded-2xl p-8 shadow">

              <h3 className="text-xl font-bold mb-4">
                🗺 Route Discovery
              </h3>

              <p>
                Find verified matatu routes quickly using
                interactive Google Maps.
              </p>

            </div>

            <div className="bg-slate-50 rounded-2xl p-8 shadow">

              <h3 className="text-xl font-bold mb-4">
                📍 Bus Stops
              </h3>

              <p>
                View all official stops and route sequences
                before starting your trip.
              </p>

            </div>

            <div className="bg-slate-50 rounded-2xl p-8 shadow">

              <h3 className="text-xl font-bold mb-4">
                💰 Fare Estimates
              </h3>

              <p>
                Know approximately how much your journey
                will cost before boarding.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-slate-900 text-white py-8 text-center">

        © 2026 Nairobi Transit Management System

      </footer>

    </div>
  );
}