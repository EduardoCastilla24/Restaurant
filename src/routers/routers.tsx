import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoute } from "@/utils/ProtectedRoute";
import { PublicRoute } from "@/utils/PublicRoute";

// Pages
import LoginPage from "@/pages/auth/Login";
import DashboardPage from "@/pages/admin/Dashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* ================= PROTECTED ================= */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin"]} />
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* ================= EXTRA ================= */}
        <Route
          path="/unauthorized"
          element={<div>No tienes permisos</div>}
        />

        <Route
          path="/inactive-user"
          element={<div>Usuario inactivo</div>}
        />

        <Route
          path="*"
          element={<div>Página no encontrada</div>}
        />

      </Routes>
    </BrowserRouter>
  );
}
