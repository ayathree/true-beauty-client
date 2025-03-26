import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Error from "./pages/Error";
import ProductDetails from "./pages/ProductDetails";



const router = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        errorElement:<Error></Error>,
        children:[
            {
                path:'/',
                element:<Home></Home>,
                
                
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/product/:id',
                element:<ProductDetails></ProductDetails>,
            },
            
        ]
    }
])

export default router;