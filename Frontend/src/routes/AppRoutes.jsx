import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import CompleteProfile from "../pages/CompleteProfile";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />

      {/* Protected */}
      <Route
        path="/complete-profile"
        element={
          <ProtectedRoute>
            <CompleteProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
