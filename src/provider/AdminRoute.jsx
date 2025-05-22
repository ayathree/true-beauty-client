import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";



const AdminRoute = ({ children }) => {
    const [isAdmin, isAdminLoading]=useAdmin()

    const{user, loading}=useAuth();
    const location = useLocation();
    if (loading || isAdminLoading) {
         return <p className="text-rose-700">Loading....</p>
        
    }
    if (user && isAdmin) {
        return children
        
    }
    return <Navigate to='/' state={{from:location}} replace ></Navigate>
  };

export default AdminRoute;