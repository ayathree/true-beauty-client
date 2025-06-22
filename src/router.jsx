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
import MyCart from "./pages/user/MyCart";
import CheckOut from "./pages/user/CheckOut";
import WishList from "./pages/user/WishList";
import ManageUsers from "./pages/admin/ManageUsers";
import AdminRoute from "./provider/AdminRoute";

import DashBoard from "./pages/admin/DashBoard";
import MyTransaction from "./pages/user/MyTransaction";
import BrandProducts from "./pages/BrandProducts";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Messages from "./pages/admin/Messages";
import FoundationFinder from "./pages/FoundationFinder";



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
                element:<AdminRoute><ManageProduct></ManageProduct></AdminRoute>
            },
            {
                path:'/allProducts',
                element:<AdminRoute><AllProducts></AllProducts></AdminRoute>
            },
            {
                path:'/updateProduct/:id',
                element:<AdminRoute><UpdateProducts></UpdateProducts></AdminRoute>,
                loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/products/${params.id}`)
            },
            {
                path:'/myOrder',
                element:<PrivateRoute><MyOrder></MyOrder></PrivateRoute>
            },
            {
                path:'/myCart',
                element:<PrivateRoute><MyCart></MyCart></PrivateRoute>

            },
            {
                path:'/checkOut/:email',
                element:<PrivateRoute><CheckOut></CheckOut></PrivateRoute>,
                // loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/checkOutData/${params.email}`)
            },
            {
                path:'/manageOrder',
                element:<AdminRoute><ManageOrder></ManageOrder></AdminRoute>
            },
            {
            
                    path:'/updateOrder/:id',
                    element:<PrivateRoute><UpdateOrder></UpdateOrder></PrivateRoute>,
                    loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/orderData/${params.id}`)
                
            },
            {
                path:'/manageUsers',
                element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path:'/shops',
                element:<Shops></Shops>
            },
            {
                path:'/wishList',
                element:<PrivateRoute><WishList></WishList></PrivateRoute>
            },
            {
                path:'/dashboard',
                element:<AdminRoute><DashBoard></DashBoard></AdminRoute>
            },
            {
                path:'/myTransaction',
                element:<PrivateRoute><MyTransaction></MyTransaction></PrivateRoute>
            },
            {
                path:'/brand/:category',
                element:<BrandProducts></BrandProducts>,
                loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/productBrand/${params.category}`)
            },
            {
                path:'/about',
                element:<About></About>

            },
            {
                path:'/contact',
                element:<ContactUs></ContactUs>

            },
            {
                path:'/messages',
                element:<AdminRoute><Messages></Messages></AdminRoute>
            },
            {
                path:'/skinTone',
                element:<FoundationFinder></FoundationFinder>
            }
            
            
            
        ]
    }
])

export default router;