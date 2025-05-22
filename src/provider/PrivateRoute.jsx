import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";



const PrivateRoute = ({ children }) => {
    const{user, loading}=useContext(AuthContext);
     const [isAdmin,]=useAdmin()

       const location = useLocation();
       if (loading ) {
           return <p className="text-rose-700">Loading....</p>
           
       }
       if (user && !isAdmin) {
           return children
           
       }
       return <Navigate to='/' state={{from:location}} replace ></Navigate>
  };
export default PrivateRoute;