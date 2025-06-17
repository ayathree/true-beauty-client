import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";



const PrivateRoute = ({ children }) => {
    const{user, loading}=useContext(AuthContext);
     const [isAdmin,isAdminLoading]=useAdmin()

       const location = useLocation();
       if (loading || isAdminLoading ) {
           return <p className="text-rose-700">Loading....</p>
           
       }
       // Only check for user existence, not admin status
    if (user && isAdmin === false) {
        return children;
    }
       return <Navigate to='/' state={{from:location}} replace ></Navigate>
  };
export default PrivateRoute;