import { Link,  useLocation,  useNavigate } from "react-router-dom";
import logo from '../assets/truebeauty_16-removebg-preview.png'
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import { IoEye, IoEyeOff } from "react-icons/io5";
// import useAdmin from "../hooks/useAdmin";



const Register = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const[registerError, setRegisterError]= useState('');
    const[success, setSuccess] = useState('');
    const[showPass, setShowPass]=useState(false);
     const from = location.state?.from || '/' 
 
    const{ createUser,updateUser, user, setUser}= useContext(AuthContext)
   
     const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const newRegister =(name,email, password,photo)
            console.log(newRegister)
            setRegisterError('');
            setSuccess('');
         if (password.length < 6) {
            setRegisterError('Password should be in 6 characters or longer')
         }

    try {
        // 1. Create user in Firebase
        const userCredential = await createUser(email, password);
        // const user = userCredential.user;
        console.log('Firebase user created:', userCredential);
form.reset();
             
         // 2. Update user profile in Firebase
            await updateUser(name, photo);

        // 3. Save to MongoDB
        const userInfo = { name, photo, email, role: 'user' };
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/users`, 
            userInfo
        );
        console.log('User saved to DB:', data);

        setUser({ 
            ...user, 
            photoURL: photo, 
            displayName: name 
        });
        // 4. Create JWT (only if MongoDB save succeeds)
        // await axios.post(
        //     `${import.meta.env.VITE_API_URL}/jwt`,
        //     { email: user?.email },
        //     { withCredentials: true }
        // );

        // 5. Update local state

        // 6. Reset form and redirect
        navigate(from,{replace:true})
                toast.success('Sign In successfully')
                setSuccess('Registered Successfully')
    } catch (err) {
        console.error('Registration error:', err);
         setRegisterError(err.message)
                if (err.message ==='Firebase: Error (auth/email-already-in-use).') {
            setRegisterError('This Email Already In Use, Try Another')
                }
            }
};
    //   if (user || loading) return
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
                  <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">Image Url<span className="text-green-700">(Please use short image URL)</span></label>
                  
              </div>
  
              <input id="loggingPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" name="photo" />
          </div>
  
          <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">Email Address</label>
              <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" name="email" />
          </div>
  
          <div className="mt-4 relative">
              <div className="flex justify-between">
                  <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">Password</label>
                  
              </div>
              <input name="password" type={showPass?"text":'password'} className="relative block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password"/>
            <span className="absolute bottom-3 right-10 text-2xl" onClick={()=>setShowPass(!showPass)}>{showPass?<IoEye />:<IoEyeOff />}</span>
  
          </div>
           {
            registerError && <p className="text-red-600 font-bold">{registerError}</p>
        }
        {
            success && <p className="text-green-600 font-bold">{success}</p>

        }
  
          <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-rose-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
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