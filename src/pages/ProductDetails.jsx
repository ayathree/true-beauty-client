// import { useState } from "react";

import {   useLoaderData, useNavigate } from "react-router-dom";

// import { AuthContext } from "../provider/AuthProvider";

// import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { BsCart } from "react-icons/bs";
// import CheckOut from "./user/CheckOut";


const ProductDetails = () => {
    const productData=useLoaderData()
    const {
        _id, productName, category, price,description,imageUrl, brand, deadline, adminEmail

    }=productData || {}

    console.log(productData)
    const navigate = useNavigate()
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const handleCart = async e =>{
        e.preventDefault()
        if (user?.email === adminEmail) return toast.error('Action not permitted!')
        // const form = e.target
        const savedProductId = _id; 
        const saverEmail = user?.email;
        const owner = adminEmail;
        const savedProduct = productName;
        const savedBrand = brand;
        const savedPrice = price;
        const productImage = imageUrl;
        const savedData = {
            savedProductId,saverEmail,owner, savedProduct, savedBrand,savedPrice,productImage
        }

        console.table(savedData)

        try{
            const {data}= await axiosSecure.post(`/cart`, savedData)
            console.log(data)
            toast.success('added in cart')

            navigate('/myCart')

        }catch(err){
            console.log(err)
            toast.error(err.response.data)
            
        }

    }
    

   
    return (
        <div className="flex flex-col md:flex-row lg:flex-row justify-around items-center gap-4">
            {/* div 1 */}
            <div>
                <p>{productName}</p>
                <p>{description}</p>
                <p>{brand}</p>
                <img src={imageUrl} alt="" />
                <p>{category}</p>
                <p>{price}</p>
                <p>{new Date (deadline).toLocaleDateString()}</p>
                <p>{adminEmail}</p>
           <p>{_id}</p> 
            </div>
            {/* div 2 */}
           <div>
             <button onClick={handleCart} className="rounded-full  border-2 border-rose-600 btn hover:bg-rose-300">< BsCart className="font-bold text-xl text-rose-600"/></button>
           
           </div>
        </div>
    );
};

export default ProductDetails;