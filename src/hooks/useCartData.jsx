import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import useAdmin from "./useAdmin";


const useCartData = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
  const [cart, setCart] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const getCart = async () => {
      if (!user?.email || isAdminLoading || isAdmin) return; // Don't fetch if still loading or is admin

      try {
        const { data } = await axiosSecure(`/cart/${user.email}`);
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    getCart();
  }, [user, isAdmin, isAdminLoading]);

  return { cart };
};

export default useCartData;
