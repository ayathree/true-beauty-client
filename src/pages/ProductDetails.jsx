// import { useState } from "react";

import {   useLoaderData, useNavigate } from "react-router-dom";

// import { AuthContext } from "../provider/AuthProvider";

// import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { BsCart } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
// import ProductCards from "../components/ProductCards";

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
    const[products,setProducts]=useState([])
   
   
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

    useEffect(() => {
        getData();
      }, [user]);
      
      const getData = async () => {
        try {
          const { data } = await axiosSecure(`/products`);
          
          // Assume you already have the current product's brand
          const currentBrand = productData?.brand;
      
          // Filter products of the same brand, excluding the current product
          const similarProducts = data
            .filter(p => p.brand === currentBrand && p._id !== productData._id)
            .slice(0, 3); // Take only 3 similar products
      
          setProducts(similarProducts);
        } catch (err) {
          console.error("Failed to fetch similar products:", err);
        }
      };

      

          
          
    

   
    return (
       <div>
        {/* product detail */}
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
        {/* similar product */}
        <div>
            <p className="text-4xl font-bold m-10 text-center">Similar Products</p>
          {
            products.map(item=> <div key={item._id} className="border-2 bg-rose-50 shadow-lg  mx-auto max-w-sm p-6 hover:border-red-400">
                <div className="flex justify-center items-center py-6">
                <img className="h-[300px]   border-2 border-rose-600" src={item.imageUrl} alt="" />
                </div>
                <h1 className="font-bold text-2xl capitalize">{item.productName}</h1>
                <p className="font-bold text-xl capitalize">{item.brand}</p>
                    <p className="font-bold text-2xl">total order:{item.totalOrder} </p>
                {/* <p><span className="font-bold">Category :{category}</span> </p> */}
               
                <hr className="mt-2 text-black border border-b-rose-600" />
                <div className="flex  justify-between items-center mt-5 " >
                    <p className="font-bold text-2xl">{item.price} BDT</p>
                    <div className="flex justify-end items-end gap-3">
                    {/* <button className="hover:text-white text-rose-600 bg-rose-200 border-2 border-rose-600 btn hover:bg-rose-300 flex justify-center items-center gap-2">Details<FaArrowRight className="font-bold text-xl text-rose-600"/></button> */}
                    <div>
                        <button  className="btn hover:bg-red-400"><FaRegHeart /></button>
                      </div>
                    </div>
    
                </div>
            </div>)
          }
      
        </div>
        {/* review of customer */}
        <div>
        <p className="text-4xl font-bold m-10 text-center">Review of customers</p>
        <button className="btn bg-slate-500 text-white">Write A Review</button>
        <button></button>
        </div>
       </div>
    );
};

export default ProductDetails;