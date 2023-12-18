import useAuthStore from "@/libs/data-access/store/authStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequiredAuth = () => {
   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

   const location = useLocation();

   if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
   }

   return <Outlet />;
};
