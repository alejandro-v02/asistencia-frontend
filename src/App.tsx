import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardInstructor from "./pages/Dashboard-instructor";
import DashboardAprendiz from "./pages/Dashboard-aprendiz";
import ProtectedRoute from "./components/modules/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

    <Route
      path="/dashboard/*"
      element={
        <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
          <Dashboard />
        </ProtectedRoute>
      }
    />

      <Route
        path="/dashboard-instructor/*"
        element={
          <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
            <DashboardInstructor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard-aprendiz/*"
        element={
          <ProtectedRoute allowedRoles={["APRENDIZ"]}>
            <DashboardAprendiz />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
