import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicRoute } from "@/utils/PublicRoute";
import { ProtectedRoute } from "@/utils/ProtectedRoute";

import LoginPage from "@/pages/auth/Login";
import Dashboard from "@/pages/admin/Dashboard";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* 🔓 RUTAS PÚBLICAS */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* 🔒 RUTAS PROTEGIDAS */}
          <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}
