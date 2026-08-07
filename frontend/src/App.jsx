import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PassengerHome from "./pages/PassengerHome";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import AddRoute from "./pages/AddRoute";
import AddStop from "./pages/AddStop";
import EditRoute from "./pages/EditRoute";

import ViewRoutes from "./pages/ViewRoutes";
import ViewStops from "./pages/ViewStops";

import RoutesPage from "./pages/RoutesPage";

import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import AddFare from "./pages/AddFare";
import ViewFares from "./pages/ViewFares";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>

      {/* Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Passenger Portal */}
      <Route path="/passenger" element={<PassengerHome />} />

      {/* Route Planner (Google Maps) */}
      <Route path="/planner" element={<RoutesPage />} />
      <Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />

      {/* Admin Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Routes */}
      <Route
        path="/routes"
        element={
          <ProtectedRoute>
            <ViewRoutes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/routes/add"
        element={
          <ProtectedRoute>
            <AddRoute />
          </ProtectedRoute>
        }
      />

      <Route
        path="/routes/edit/:id"
        element={
          <ProtectedRoute>
            <EditRoute />
          </ProtectedRoute>
        }
      />

      {/* Stops */}
      <Route
        path="/stops"
        element={
          <ProtectedRoute>
            <ViewStops />
          </ProtectedRoute>
        }
      />

      <Route
        path="/stops/add"
        element={
          <ProtectedRoute>
            <AddStop />
          </ProtectedRoute>
        }
      />
<Route
  path="/fares"
  element={
    <ProtectedRoute>
      <ViewFares />
    </ProtectedRoute>
  }
/>

<Route
  path="/fares/add"
  element={
    <ProtectedRoute>
      <AddFare />
    </ProtectedRoute>
  }
/> 
      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
    
  );
}

export default App;