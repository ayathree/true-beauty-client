import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../assets/truebeauty_16-removebg-preview.png'
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase/firebase.config";
// import useAdmin from "../hooks/useAdmin";
// import useAxiosSecure from "../hooks/useAxiosSecure";


const Login = () => {
  const navigate = useNavigate()
  const[registerError, setRegisterError]= useState('');
  const emailRef = useRef(null);
   const location = useLocation()
   const[success, setSuccess] = useState('');
    const[showPass, setShowPass]=useState(false);
  const {signIn, google,}= useContext(AuthContext)
  // const [isAdmin] = useAdmin();
  //  const axiosSecure = useAxiosSecure()
  const from = location.state?.from || '/' 
//   useEffect(() => {
//   if (user) {
//     // Define your actual admin route patterns
//     const adminRoutes = [
//       '/manageProducts',
//       '/allProducts',
//       '/updateProduct/:id',
//       '/manageOrder',
//       '/manageUsers',
//       '/dashboard',
//       '/messages'
     
//     ];

//     const isRequestingAdminRoute = adminRoutes.some(route => 
//       from.startsWith(route)
//     );

//     // Check if trying to access admin route without admin privileges
//     if (isRequestingAdminRoute && !isAdmin) {
//       navigate('/', { replace: true });
//     }
//     // Check if admin is trying to access non-admin routes
//     else if (!isRequestingAdminRoute && isAdmin && from !== '/') {
//       navigate('/', { replace: true }); 
//     }
//     // Otherwise go to requested page
//     else {
//       navigate(from, { replace: true });
//     }
//   }
// }, [user, isAdmin, navigate, from]);

  const handleGoogleLogin = async () => {
  try {
    const result = await google();
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
      name: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
      uid: result.user.uid
    });
    
    // await axios.post(
    //         `${import.meta.env.VITE_API_URL}/jwt`,
    //         { email: user?.email },
    //         { withCredentials: true }
    //     );
    if (data.message === 'user exists') {
      toast.success('Welcome back!');
    } else {
      toast.success('Account created!');
    }
    
    navigate(from, { replace: true });
  } catch (err) {
    toast.error(err.response?.data?.error || 'Login failed');
  }
};

  const handleSignIn =async e=>{
    e.preventDefault();
    const form = e.target
    const email=form.email.value
    const password = form.password.value
    const newUser =(email, password)
  
        console.log(newUser)
         setRegisterError('');
        setSuccess('');
    try{
     
      const result = await signIn(email,password)
      console.log(result.user)
    //   const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/jwt`,{
    //     email :result?.user?.email,
    // }, {withCredentials: true})
    //   console.log(data)
    
      navigate(from, {replace: true})
      toast.success('Sign In successfully'  )
      setSuccess('Registered Successfully')
    


    }
    catch(err){
      console.log(err)
      // toast.error(err?.message)
      if (err?.message==='Firebase: Error (auth/invalid-credential).') {
            setRegisterError('Invalid Password Or Email, Check Again')
            
            
        }
        if (err?.message==='Firebase: Error (auth/invalid-email).') {
            setRegisterError('Please Fill Up All the Fields')
            
            
        }

    }

  }

   const handleForgetPass=()=>{
  
        const email = emailRef.current.value;
        if (!email) {
          console.log(emailRef.current.value)
          return;
  
          
        }
        
          sendPasswordResetEmail(auth, email)
          .then(()=>{
            alert('check your email')
          })
          .catch(error=>{
            console.log(error)
          })
  
      
  
      }
  // if ( user || loading) return
  
    return (
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl min-h-[calc(100vh-306px)] my-12">
      <div className="hidden bg-cover lg:block lg:w-1/2"
       style={{

        backgroundImage: `url('https://media.istockphoto.com/id/1211053097/photo/natural-make-up-flat-lay-on-wooden-background.jpg?s=612x612&w=0&k=20&c=mCPDyw48w4RCsW8P0iTikfo5-Yuc09H7LB69f8_cRns=')`



       }


       }></div>
  
      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
           
              <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
          </div>
  
          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
              Welcome back!
          </p>
  
          <a onClick={handleGoogleLogin} className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <div className="px-4 py-2">
                  <svg className="w-6 h-6" viewBox="0 0 40 40">
                      <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                      <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                      <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                      <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                  </svg>
              </div>
  
              <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
          </a>
  
          <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
  
              <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or login
                  with email</a>
  
              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>
  
         <form onSubmit={handleSignIn}>
         <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">Email Address</label>
              <input id="LoggingEmailAddress" ref={emailRef} className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" name="email" />
          </div>
  
          <div className="mt-4 relative">
              <div className="flex justify-between">
                  <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">Password</label>
                 
              </div>
  
              <input name="password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 dark:text-white bg-white border rounded-lg dark:bg-gray-800 dark:border-white dark:placeholder-white focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type={showPass?"text":'password'} placeholder="Password" aria-label="Password" />
                <span className="absolute bottom-3 right-10 text-xl" onClick={()=>setShowPass(!showPass)}>{showPass?<IoEye />:<IoEyeOff />}</span>
          </div>
           {
            registerError && <p className="text-red-600 font-bold">{registerError}</p>
        }
        {
            success && <p className="text-green-600 font-bold">{success}</p>

        }
        <a href="#" onClick={handleForgetPass} className="text-sm hover:text-rose-600 text-gray-600 dark:text-gray-200">Forget Password?</a>
  
          <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-rose-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                  Sign In
              </button>
          </div>
         </form>
  
          <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
  
               <Link to={'/register'}><p className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign up</p></Link>
  
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
      </div>
  </div>
    );
};

export default Login;
