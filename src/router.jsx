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
import PrivateRoute from "./provider/PrivateRoute";
import MyOrder from "./pages/user/MyOrder";
import ManageOrder from "./pages/admin/ManageOrder";
import UpdateOrder from "./pages/user/UpdateOrder";
import Shops from "./pages/Shops";



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
                element:<PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
                loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/products/${params.id}`)
            },
            {
                path:'/manageProducts',
                element:<PrivateRoute><ManageProduct></ManageProduct></PrivateRoute>
            },
            {
                path:'/allProducts',
                element:<PrivateRoute><AllProducts></AllProducts></PrivateRoute>
            },
            {
                path:'/updateProduct/:id',
                element:<PrivateRoute><UpdateProducts></UpdateProducts></PrivateRoute>,
                loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/products/${params.id}`)
            },
            {
                path:'/myOrder',
                element:<PrivateRoute><MyOrder></MyOrder></PrivateRoute>
            },
            {
                path:'/manageOrder',
                element:<PrivateRoute><ManageOrder></ManageOrder></PrivateRoute>
            },
            {
            
                    path:'/updateOrder/:id',
                    element:<PrivateRoute><UpdateOrder></UpdateOrder></PrivateRoute>,
                    loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/orderData/${params.id}`)
                
            },
            {
                path:'/shops',
                element:<Shops></Shops>
            }
            
        ]
    }
])

export default router;