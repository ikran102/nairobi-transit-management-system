export default function About() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-5xl mx-auto py-20 px-8">

        <h1 className="text-5xl font-bold text-emerald-700 mb-8">
          About Nairobi Transit
        </h1>

        <p className="text-lg text-slate-700 leading-8 mb-10">
          Nairobi Transit is a web-based transport management system that
          helps passengers discover matatu routes, estimate fares,
          locate bus stops, and plan journeys across Nairobi.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-emerald-700 mb-3">
              Mission
            </h2>

            <p>
              To simplify public transport by providing reliable and
              accurate route information.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-emerald-700 mb-3">
              Vision
            </h2>

            <p>
              To become Nairobi's most trusted public transport information
              platform.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-emerald-700 mb-3">
              Features
            </h2>

            <ul className="space-y-2">
              <li>✔ Route Discovery</li>
              <li>✔ Google Maps Navigation</li>
              <li>✔ Fare Estimates</li>
              <li>✔ Bus Stop Information</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}