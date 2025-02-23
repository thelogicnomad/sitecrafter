import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = () => {
  const { token } = useAuth();
  const tokenFromStorage = localStorage.getItem("token");
  const location = useLocation();

  // Check if the user is coming from Google OAuth (e.g., `/auth/callback?google=true`)
  const urlParams = new URLSearchParams(location.search);
  const isGoogleLogin = urlParams.get("google");

  console.log("Checking token in ProtectedRoute:", token);
  
  if (!token && !tokenFromStorage && !isGoogleLogin) {
    console.warn("Unauthorized access. Redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
