import {
  LayoutDashboard,
  Route,
  PlusCircle,
  MapPinned,
  Map,
  LogOut,
  Banknote,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Routes",
      icon: Route,
      path: "/routes",
    },
    {
      name: "Add Route",
      icon: PlusCircle,
      path: "/routes/add",
    },
    {
      name: "Stops",
      icon: MapPinned,
      path: "/stops",
    },
    {
      name: "Add Stop",
      icon: PlusCircle,
      path: "/stops/add",
    },
    {
      name: "Manage Fares",
      icon: Banknote,
      path: "/fares",
    },
    {
      name: "Add Fare",
      icon: Banknote,
      path: "/fares/add",
    },
    {
      name: "Passenger Map",
      icon: Map,
      path: "/passenger",
    },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm">

      <div className="px-8 py-8 border-b">

        <h1 className="text-3xl font-bold text-green-700">
          Nairobi
        </h1>

        <p className="text-gray-500 text-sm">
          Transit Management
        </p>

      </div>

      <nav className="flex-1 px-5 py-6 space-y-2">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-green-700 text-white shadow-md"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`
              }
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}

      </nav>

      <div className="p-5 border-t">

        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;