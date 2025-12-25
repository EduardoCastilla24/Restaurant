import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/AuthStore";
import { ProtectedRoute } from "@/utils/ProtectedRoute";
import { PublicRoute } from "@/utils/PublicRoute";

// Importa tus páginas
import LoginPage from "@/pages/auth/Login";
// import DashboardPage from "@/pages/DashboardPage";
// import KitchenPage from "@/pages/KitchenPage";
// import UnauthorizedPage from "@/pages/UnauthorizedPage";

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  // Inicializar el listener de Supabase al cargar la app
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas (Login) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Rutas Protegidas */}

        {/* A. Rutas para CUALQUIER usuario logueado */}
        <Route element={<ProtectedRoute />}>
          {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}
        </Route>

        {/* B. Rutas SOLO para ADMIN y SUPERADMIN */}
        <Route element={<ProtectedRoute allowedRoles={['admin', 'superadmin']} />}>
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
          {/* <Route path="/admin/users" element={<UsersPage />} /> */}
        </Route>

        {/* C. Rutas para COCINA */}
        <Route element={<ProtectedRoute allowedRoles={['kitchen', 'admin', 'superadmin']} />}>
          {/* <Route path="/kitchen" element={<KitchenPage />} /> */}
        </Route>

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;