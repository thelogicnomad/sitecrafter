import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = () => {
  const { token } = useAuth();

  console.log(" Checking token in ProtectedRoute:", token); 

  const tokenFromStorage = localStorage.getItem("token");
  if (!token && !tokenFromStorage) {
    console.warn(" Unauthorized access. Redirecting to login...");
    return <Navigate to="/login" replace />;
  }
  

  return <Outlet />;
};

export default ProtectedRoute;
