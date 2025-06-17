import { useContext, useEffect, useState } from 'react';
import logo from '../assets/truebeauty_16-removebg-preview.png'
import { AuthContext } from '../provider/AuthProvider';
import { Link, NavLink } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import { IoNotifications } from 'react-icons/io5';
// import useAxiosSecure from '../hooks/useAxiosSecure';
import { FaShoppingCart } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import axios from 'axios';


const NavBar = () => {
  const{user}=useAuth()
  const [isAdmin]=useAdmin()
  const{ loggedOut}=useContext(AuthContext)
  // const axiosSecure=useAxiosSecure()
  const [order,setOrder]=useState([])
  const [cart, setCart] =useState([])


  
  useEffect(() => {
    const controller = new AbortController(); // Create abort controller
  
    const getData = async () => {
      if (!user?.email || isAdmin === undefined) return;
      try {
        if (isAdmin) {
          const { data } = await axios(`${import.meta.env.VITE_API_URL}/orderAdmin/${user.email}`, {
            signal: controller.signal // Attach abort signal
          });
          setOrder(data);
        } else {
          const { data } = await axios(`${import.meta.env.VITE_API_URL}/cart/${user.email}`, {
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
      <div>
        {/* 1ct nav */}
        <div className="navbar bg-base-100">
      <div className="flex-1">
        <img src={logo} className='h-16 w-24 md:h-[100px] md:w-[150px]' alt="" />
        <h1 className='text-xl md:text-2xl font-semibold text-rose-600 capitalize'>True beauty</h1>
        
      </div>

      {/* Mobile Menu Button (Hamburger) */}
  <div className="md:hidden">
    <details className="dropdown dropdown-bottom  dropdown-left">
  <summary tabIndex={0} role="button" className="btn btn-ghost btn-circle text-rose-600" >
     <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M4 6h16M4 12h16M4 18h16" 
        />
      </svg>
  </summary>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[10] w-52 p-2 shadow-sm">
    <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold  ':'dark:text-white'} to={'/'}><li>Home</li></NavLink>
          <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold ':'dark:text-white'} to={'/shops'}><li>Shop</li></NavLink>
          <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold ':'dark:text-white'} to={'/about'}><li>About Us</li></NavLink>
          <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold ':'dark:text-white'} to={'/contact'}><li>Contact Us</li></NavLink>

         {
          !user &&  <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold ':'dark:text-white'} to={'/login'}><li>Login</li></NavLink>
          
         }
  </ul>
</details>
    
  </div>

 
  
      <div className="mr-4 hidden md:block">
        <ul className="flex md:flex-row gap-5 text-black font-semibold ">
          <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold ':'dark:text-white'} to={'/'}><li>Home</li></NavLink>
          <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold ':'dark:text-white'} to={'/shops'}><li>Shop</li></NavLink>
          <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold ':'dark:text-white'} to={'/about'}><li>About Us</li></NavLink>
          <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold ':'dark:text-white'} to={'/contact'}><li>Contact Us</li></NavLink>

         {
          !user &&  <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold ':'dark:text-white'} to={'/login'}><li>Login</li></NavLink>
          
         }
        </ul>
      </div>
     {
      user && !isAdmin && 
        
       <div className='md:flex items-center gap-3 hidden '>
        <div className="relative inline-block group">
        {cart.length !== 0 && (
  <div className="absolute -top-2 left-3 badge badge-sm badge-neutral">
    <p className='text-white'>{cart.length}</p>
  </div>
)}
  <FaShoppingCart  className="text-xl text-rose-600" />
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
       <Link to={'/myTransaction'}><li><a>My Transaction</a></li></Link>
      
      
       
       
        <li><a onClick={loggedOut}>Logout</a></li>
      </ul>
    </div>
    
       </div>
     
    
    
     }
     {
      user && isAdmin &&
      
        <div className='md:flex items-center gap-3 hidden'>
        <div className="relative inline-block group">
        {order.length !== 0 && (
  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
)}
  <IoNotifications className="text-xl text-rose-500" />
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
        
       <Link  to={'/manageProducts'}> <li><a>Manage Product</a></li></Link>
       <Link  to={'/manageOrder'}> <li><a>Manage Orders</a></li></Link>
       <Link  to={'/manageUsers'}><li><a>Manage Users</a></li></Link>
       <Link  to={'/dashboard'}><li><a>DashBoard</a></li></Link>
        <Link to={'/messages'}><li><a>All Messages</a></li></Link>
      
       
       
        <li><a onClick={loggedOut}>Logout</a></li>
      </ul>
    </div>
        </div>
     }

      
    </div>
    {/* 2nd nav */}
    {/* mobile user/admin profile */}
  <div className='md:hidden'>
    {/* user */}
    {
user && !isAdmin &&
<div className='flex flex-row text-xs justify-center items-center gap-4'>
 <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold ':''} to={'/myOrder'}>Order</NavLink>
          <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold ':''} to={'/wishList'}>WishList</NavLink>
          <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold ':''} to={'/myCart'}>Cart</NavLink>
          <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold ':''} to={'/myTransaction'}>Transactions</NavLink>
      <a onClick={loggedOut}>Logout</a>
       <div className="relative inline-block group">
        {cart.length !== 0 && (
  <div className="absolute -top-2 left-3 badge badge-sm badge-neutral">
    <p className='text-white text-xs'>{cart.length}</p>
  </div>
)}
  <FaShoppingCart  className="text-xs text-rose-600" />
</div>
</div>
    }

    {/* admin */}
    {
 user && isAdmin &&
<div className='flex flex-row text-xs justify-center items-center gap-2'>
 <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold ':''} to={'/manageProducts'}>Products</NavLink>
          <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold ':''} to={'/manageOrder'}>Orders</NavLink>
          <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold ':''} to={'/manageUsers'}>Users</NavLink>
          <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold ':''} to={'/dashboard'}>Dashboard</NavLink>
          <NavLink className={({isActive})=>isActive?'text-rose-600 font-bold ':''} to={'/messages'}>Messages</NavLink>
      <a onClick={loggedOut}>Logout</a>
       <div className="relative inline-block group">
        {order.length !== 0 && (
  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
)}
  <IoNotifications className="text-xs text-rose-500" />
  <div className="invisible group-hover:visible fixed top-4 right-4 text-xs bg-gray-800 text-white  px-3 py-2 rounded z-50 w-48 shadow-lg">
    {order.length} order notifications
  </div>
</div>
</div>
    }
  </div>
      </div>
    );
};

export default NavBar;