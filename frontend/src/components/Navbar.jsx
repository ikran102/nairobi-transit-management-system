import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const username = localStorage.getItem("username") || "Admin";

  const titles = {
    "/dashboard": "Dashboard",
    "/routes": "Routes",
    "/routes/add": "Add Route",
    "/stops": "Stops",
    "/stops/add": "Add Stop",
    "/passenger": "Passenger Map",
  };

  const pageTitle = titles[location.pathname] || "Nairobi Transit";

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          {pageTitle}
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Nairobi Transit Management System
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">

          <p className="font-semibold text-gray-800">
            {username}
          </p>

          <p className="text-sm text-gray-500">
            Administrator
          </p>

        </div>

        <div className="w-12 h-12 rounded-full bg-green-700 text-white flex items-center justify-center text-lg font-bold shadow">
          {username.charAt(0).toUpperCase()}
        </div>

      </div>

    </header>
  );
}

export default Navbar;