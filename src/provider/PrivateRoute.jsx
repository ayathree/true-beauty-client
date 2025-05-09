import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
  
    if (loading || isAdminLoading) return <p>Loading....</p>;
  
    // Not logged in - redirect to login but remember where they wanted to go
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    // Logged in but admin - redirect to home
    if (isAdmin) {
      return <Navigate to="/" replace />;
    }
  
    // Logged in user - allow access
    return children;
  };
export default PrivateRoute;