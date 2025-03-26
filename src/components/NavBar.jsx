import { useContext } from 'react';
import logo from '../assets/truebeauty_16-removebg-preview.png'
import { AuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const{user, loggedOut}=useContext(AuthContext)
    return (
      <div className="navbar bg-base-100">
      <div className="flex-1">
        <img src={logo} className='h-[100px] w-[150px]' alt="" />
        <h1 className='capitalize font-semibold text-2xl'>True beauty</h1>
        
      </div>
      <div className="mr-4">
        <ul className="flex flex-row gap-5 ">
          <Link to={'/'}><li>Home</li></Link>
          <Link to={'/'}><li>Shope</li></Link>
          <Link to={'/'}><li>About Us</li></Link>
          <Link to={'/'}><li>Contact Us</li></Link>

         {
          !user &&  <Link to={'/login'}><li>Login</li></Link>
          
         }
        </ul>
      </div>
     {
      user &&  <div className='flex flex-row gap-5'>
        <Link to={'/'}>Dashboard</Link>
        <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img referrerPolicy='no-referrer' alt="Tailwind CSS Navbar component" src={user.photoURL} />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <Link to={''}><li>
          <a >
           My Order
           
          </a>
        </li></Link>
        <Link to={''}><li><a>Wish List</a></li></Link>
       <Link to={''}> <li><a>My Cart</a></li></Link>
       
       
        <li><a onClick={loggedOut}>Logout</a></li>
      </ul>
    </div>
    
      </div>
    
    
     }
    </div>
    );
};

export default NavBar;