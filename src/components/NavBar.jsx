import { useContext, useEffect, useState } from 'react';
import logo from '../assets/truebeauty_16-removebg-preview.png'
import { AuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import { IoNotifications } from 'react-icons/io5';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { FaShoppingCart } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';


const NavBar = () => {
  const{user}=useAuth()
  const [isAdmin]=useAdmin()
  const{ loggedOut}=useContext(AuthContext)
  const axiosSecure=useAxiosSecure()
  const [order,setOrder]=useState([])
  const [cart, setCart] =useState([])

  
  useEffect(() => {
    const controller = new AbortController(); // Create abort controller
  
    const getData = async () => {
      if (!user?.email || isAdmin === undefined) return;
      try {
        if (isAdmin) {
          const { data } = await axiosSecure(`/orderAdmin/${user.email}`, {
            signal: controller.signal // Attach abort signal
          });
          setOrder(data);
        } else {
          const { data } = await axiosSecure(`/cart/${user.email}`, {
            signal: controller.signal // Attach abort signal
          });
          setCart(data);
          getData()
        }
      } catch (err) {
        // Check if error was from abort
        if (err.name === 'CanceledError' || err.message === 'canceled') return;
        
        if (err.response?.status === 401) {
          console.log('Session expired - please login again');
        }
      }
    };
  
    getData();
  
    // Cleanup function
    return () => {
      controller.abort(); // Cancel pending request on unmount/logout
    };
  }, [user, isAdmin]);

    return (
      <div className="navbar bg-base-100">
      <div className="flex-1">
        <img src={logo} className='h-[100px] w-[150px]' alt="" />
        <h1 className='capitalize font-semibold text-2xl'>True beauty</h1>
        
      </div>
      <div className="mr-4">
        <ul className="flex flex-row gap-5 ">
          <Link to={'/'}><li>Home</li></Link>
          <Link to={'/shops'}><li>Shop</li></Link>
          <Link to={'/'}><li>About Us</li></Link>
          <Link to={'/'}><li>Contact Us</li></Link>

         {
          !user &&  <Link to={'/login'}><li>Login</li></Link>
          
         }
        </ul>
      </div>
     {
      user && !isAdmin && 
        
       <div className='flex items-center gap-3'>
        <div className="relative inline-block group">
        {cart.length !== 0 && (
  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full">
    <p>{cart.length}</p>
  </div>
)}
  <FaShoppingCart  className="text-xl" />
  {/* <div className="invisible group-hover:visible fixed top-4 right-4 bg-gray-800 text-white text-sm px-3 py-2 rounded z-50 w-48 shadow-lg">
    {cart.length} 
  </div> */}
</div>

         <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img referrerPolicy='no-referrer' alt="Tailwind CSS Navbar component" src={user.photoURL} />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[10] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <Link to={'/myOrder'}><li>
          <a >
           My Order
           
          </a>
        </li></Link>
        <Link to={'/wishList'}><li><a>Wish List</a></li></Link>
       <Link to={'/myCart'}> <li><a>My Cart</a></li></Link>
      
      
       
       
        <li><a onClick={loggedOut}>Logout</a></li>
      </ul>
    </div>
    
       </div>
     
    
    
     }
     {
      user && isAdmin &&
      
        <div className='flex items-center gap-3'>
        <div className="relative inline-block group">
        {order.length !== 0 && (
  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
)}
  <IoNotifications className="text-xl" />
  <div className="invisible group-hover:visible fixed top-4 right-4 bg-gray-800 text-white text-sm px-3 py-2 rounded z-50 w-48 shadow-lg">
    {order.length} order notifications
  </div>
</div>
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img referrerPolicy='no-referrer' alt="Tailwind CSS Navbar component" src={user.photoURL} />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[10] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        
       <Link to={'/manageProducts'}> <li><a>Manage Product</a></li></Link>
       <Link to={'/manageOrder'}> <li><a>Manage Orders</a></li></Link>
       <Link to={'/manageUsers'}><li><a>Manage Users</a></li></Link>
      
       
       
        <li><a onClick={loggedOut}>Logout</a></li>
      </ul>
    </div>
        </div>
     }
    </div>
    );
};

export default NavBar;