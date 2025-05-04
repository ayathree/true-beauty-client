import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";


const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
  
    if (loading || isAdminLoading) return <div>Loading...</div>;
  
    // Not logged in - redirect to login but remember admin path
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    // Logged in but not admin - redirect to home
    if (!isAdmin) {
      return <Navigate to="/" replace />;
    }
  
    // Logged in admin - allow access
    return children;
  };

export default AdminRoute;