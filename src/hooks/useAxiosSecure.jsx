import { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { loggedOut, user } = useAuth(); // Add user to dependencies
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (!error.response) return Promise.reject(error);
        
        console.log('Interceptor caught error:', error.response.status);
          try {
            await loggedOut();
            // Delay navigation to avoid React warnings
            setTimeout(() => navigate('/login'), 100);
          } catch (logoutError) {
            console.error('Logout failed:', logoutError);
          }
       
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [loggedOut, navigate, user]); // Add user to dependencies

  return axiosSecure;
};

export default useAxiosSecure;