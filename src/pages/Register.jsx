import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../assets/truebeauty_16-removebg-preview.png'
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import useAdmin from "../hooks/useAdmin";



const Register = () => {
    const navigate = useNavigate()
     const location = useLocation()
       const from = location.state?.from || '/' 
    const{ createUser,updateUser, user, setUser, loading}= useContext(AuthContext)
    const [isAdmin] = useAdmin();
    useEffect(()=>{
        if(user){
         // Check if trying to access admin route without admin privileges
         if (from.startsWith('/admin') && !isAdmin) {
          navigate('/', { replace: true });
        }
        // Check if trying to access user route as admin
        else if (!from.startsWith('/admin') && isAdmin) {
          navigate('/', { replace: true });
        }
         // Otherwise go to requested page
         else {
          navigate(from, { replace: true });
        }
        }
      },[user, isAdmin, navigate, from])
    
      const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
    
        try {
            // 1. Create user in Firebase Auth
            const result = await createUser(email, password);
            console.log('Firebase user created:', result);
    
            // 2. Update user profile in Firebase
            await updateUser(name, photo);
    
            // 3. Save additional user info to your MongoDB
            const userInfo = {
                name,
                photo,
                email,
                role: 'user' // Adding default role
            };
            
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/users`, 
                userInfo
            );
            console.log('User saved to DB:', data);
    
            // 4. Update local state and create JWT
            setUser({ 
                ...result.user, 
                photoURL: photo, 
                displayName: name 
            });
    
            await axios.post(
                `${import.meta.env.VITE_API_URL}/jwt`,
                { email: result.user.email },
                { withCredentials: true }
            );
    
            // 5. Reset form and navigate
            form.reset();
            navigate(from, { replace: true });
            toast.success('Registration successful!');
        } catch (err) {
            console.error('Registration error:', err);
            toast.error(err.response?.data?.message || err.message || 'Registration failed');
        }
    };
      if (user || loading) return
    return (
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl  min-h-[calc(100vh-306px)] my-12">
      <div className="hidden bg-cover lg:block lg:w-1/2"
       style={{

        backgroundImage: `url('https://media.istockphoto.com/id/1211053097/photo/natural-make-up-flat-lay-on-wooden-background.jpg?s=612x612&w=0&k=20&c=mCPDyw48w4RCsW8P0iTikfo5-Yuc09H7LB69f8_cRns=')`



       }


       }></div>
  
      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
           
              <img className="w-auto lg:h-20 h-8" src={logo} alt="" />
          </div>
  
          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
              Welcome back!
          </p>
  
         
  
          <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
  
              <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">Register Now</a>
  
              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleRegister}>
          <div className="mt-4">
              <div className="flex justify-between">
                  <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">Name</label>
                  
              </div>
  
              <input id="loggingPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text " name="name" />
          </div>
          <div className="mt-4">
              <div className="flex justify-between">
                  <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">Image Url</label>
                  
              </div>
  
              <input id="loggingPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" name="photo" />
          </div>
  
          <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">Email Address</label>
              <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" name="email" />
          </div>
  
          <div className="mt-4">
              <div className="flex justify-between">
                  <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">Password</label>
                  
              </div>
  
              <input id="loggingPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" name="password" />
          </div>
  
          <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                  Sign Up
              </button>
          </div>
          </form>
  
          <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
  
               <Link to={'/login'}><p className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign in</p></Link>
  
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
      </div>
  </div>
    );
};

export default Register;