import { Navigate } from "react-router-dom";
import AuthService from "./AuthService";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { role } = AuthService.useAuth();

  if (!role) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/signin" replace />;
  }

  if (allowedRoles.includes(role)) {
    return children;
  }

  // Redirect unauthorized users to home
  return <Navigate to="/admin/home" replace />;
};

export default ProtectedRoute;
