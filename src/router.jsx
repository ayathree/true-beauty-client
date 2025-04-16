import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Error from "./pages/Error";
import ProductDetails from "./pages/ProductDetails";
import ManageProduct from "./pages/admin/ManageProduct";
import AllProducts from "./pages/admin/AllProducts";
import UpdateProducts from "./pages/admin/UpdateProducts";



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
                loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/products/${params.id}`)
            },
            {
                path:'/manageProducts',
                element:<ManageProduct></ManageProduct>
            },
            {
                path:'/allProducts',
                element:<AllProducts></AllProducts>
            },
            {
                path:'/updateProduct/:id',
                element:<UpdateProducts></UpdateProducts>,
                loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/products/${params.id}`)
            },
            
        ]
    }
])

export default router;