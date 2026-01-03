import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicRoute } from "@/utils/PublicRoute";
import { ProtectedRoute } from "@/utils/ProtectedRoute";

import LoginPage from "@/pages/auth/Login";
import Dashboard from "@/pages/admin/Dashboard";
import UsuariosPages from "@/pages/admin/Usuarios";
import OrdenesPages from "@/pages/admin/Ordenes";
import MesasPages from "@/pages/users/Mesas";
import PosPages from "@/pages/users/Pos";
import PlatillosPages from "@/pages/users/Platillos";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* 🔓 RUTAS PÚBLICAS */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* 🔒 RUTAS PROTEGIDAS */}
          <Route element={<ProtectedRoute allowedRoles={["superadmin", "admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["superadmin", "admin"]} />}>
            <Route path="/usuarios" element={<UsuariosPages />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["superadmin", "admin"]} />}>
            <Route path="/ordenes" element={<OrdenesPages />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["superadmin", "admin"]} />}>
            <Route path="/mesas" element={<MesasPages />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["superadmin", "admin"]} />}>
            <Route path="/pos" element={<PosPages />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["superadmin", "admin"]} />}>
            <Route path="/platillos" element={<PlatillosPages />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}
