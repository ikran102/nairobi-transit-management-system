import { Link } from "react-router-dom";

export default function PassengerHome() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

          <h1 className="text-3xl font-bold text-emerald-700">
            Nairobi Transit
          </h1>

          <div className="flex gap-8 font-medium">
            <Link to="/">Home</Link>
            <Link to="/planner">Planner</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-600 to-green-700 text-white py-20">

        <div className="max-w-6xl mx-auto px-8">

          <h1 className="text-6xl font-bold mb-6">
            Find Your Best Route
          </h1>

          <p className="text-xl mb-10">
            Discover matatu routes, fares, stops and travel times across Nairobi.
          </p>

          <div className="bg-white rounded-xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
              placeholder="From"
              className="border rounded-lg p-4 text-black"
            />

            <input
              placeholder="To"
              className="border rounded-lg p-4 text-black"
            />

            <Link
              to="/planner"
              className="bg-emerald-600 text-white rounded-lg flex items-center justify-center font-semibold hover:bg-emerald-700"
            >
              Search Routes
            </Link>

          </div>

        </div>

      </section>

      {/* Popular Routes */}

      <section className="max-w-7xl mx-auto py-16 px-8">

        <h2 className="text-4xl font-bold mb-10">
          Popular Routes
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {[
            {
              no: "46W",
              destination: "Kawangware",
              fare: "KES 70",
              eta: "7 mins",
            },
            {
              no: "111",
              destination: "Ngong",
              fare: "KES 100",
              eta: "12 mins",
            },
            {
              no: "102",
              destination: "Westlands",
              fare: "KES 50",
              eta: "5 mins",
            },
            {
              no: "125",
              destination: "Rongai",
              fare: "KES 90",
              eta: "10 mins",
            },
            {
              no: "34B",
              destination: "Embakasi",
              fare: "KES 70",
              eta: "8 mins",
            },
            {
              no: "237",
              destination: "Thika",
              fare: "KES 150",
              eta: "15 mins",
            },
          ].map((route) => (

            <div
              key={route.no}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-3xl font-bold text-emerald-700">
                    {route.no}
                  </h3>

                  <p className="text-gray-600">
                    CBD → {route.destination}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-semibold">
                    {route.fare}
                  </p>

                  <p className="text-sm text-gray-500">
                    ETA {route.eta}
                  </p>

                </div>

              </div>

              <Link
                to="/planner"
                className="mt-6 block bg-emerald-600 text-center text-white rounded-lg py-3 hover:bg-emerald-700"
              >
                View Route
              </Link>

            </div>

          ))}

        </div>

      </section>

      {/* Features */}

      <section className="bg-white py-20">

        <div className="max-w-6xl mx-auto px-8">

          <h2 className="text-4xl font-bold text-center mb-14">
            Why Nairobi Transit?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-slate-50 p-8 rounded-xl">

              <h3 className="text-xl font-bold mb-3">
                Live Route Planning
              </h3>

              <p>
                Easily discover available matatu routes and directions.
              </p>

            </div>

            <div className="bg-slate-50 p-8 rounded-xl">

              <h3 className="text-xl font-bold mb-3">
                Fare Estimates
              </h3>

              <p>
                View estimated fares before starting your journey.
              </p>

            </div>

            <div className="bg-slate-50 p-8 rounded-xl">

              <h3 className="text-xl font-bold mb-3">
                Bus Stops
              </h3>

              <p>
                Find nearby bus stops and routes serving each location.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-slate-900 text-white py-8">

        <div className="max-w-6xl mx-auto text-center">

          <h3 className="text-2xl font-bold">
            Nairobi Transit
          </h3>

          <p className="mt-2 text-gray-400">
            Smarter Public Transport for Nairobi
          </p>

        </div>

      </footer>

    </div>
  );
}