export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-4xl mx-auto py-20 px-8">

        <h1 className="text-5xl font-bold text-emerald-700 mb-8">
          Contact Us
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8">

          <div className="space-y-6">

            <div>
              <h3 className="font-bold">Email</h3>
              <p>support@nairobitransit.co.ke</p>
            </div>

            <div>
              <h3 className="font-bold">Phone</h3>
              <p>+254 700 123 456</p>
            </div>

            <div>
              <h3 className="font-bold">Address</h3>
              <p>Nairobi CBD, Kenya</p>
            </div>

          </div>

          <form className="mt-10 space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg p-3"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-lg p-3"
            />

            <textarea
              rows="5"
              placeholder="Message"
              className="w-full border rounded-lg p-3"
            />

            <button
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}