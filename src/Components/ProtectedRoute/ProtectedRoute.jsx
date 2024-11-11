import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  const location = useLocation();

  if (!token && !role) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  if (
    location.pathname === "/admin-dashboard/create-admin" &&
    role === "subAdmin"
  ) {
    return <Navigate to="/admin-dashboard" />;
  }

  if (
    location.pathname === "/admin-dashboard/all-admins" &&
    role === "subAdmin"
  ) {
    return <Navigate to="/admin-dashboard" />;
  }

  return <>{children}</>;
}
