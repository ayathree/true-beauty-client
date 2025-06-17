import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";
// import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const {user, loading}= useAuth()
//    const axiosSecure = useAxiosSecure();
   const {data: isAdmin, isPending: isAdminLoading}= useQuery({
    queryKey:[user?.email, 'isAdmin'],
    enabled: !!user?.email && !loading,
    queryFn: async()=>{
        try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/admin/${user?.email}`);
                console.log(res.data);
                return res.data?.admin || false;

            } catch (error) {
                console.error("Admin check failed:", error);
                return false;
            }
    }
   })
   return [isAdmin, isAdminLoading]
};

export default useAdmin;