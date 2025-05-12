// import { useState } from "react";

import {   useLoaderData, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

// import { AuthContext } from "../provider/AuthProvider";

// import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { BsCart } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";


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
    const [showText, setShowText] = useState(false);
    const [rating, setRating] = useState(0);
    
   
   
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

      // review
      

  const handleClick = () => {
    setShowText(!showText); // Toggles the state between true/false
  };
  
  // rating
 const ratingChanged = (newRating) => {
    setRating(newRating);
    console.log("Selected Rating:", newRating);
    // You can also send this to your backend here if needed
  };

// post review
 const handleReview=async e=>{
        e.preventDefault()
         if (user?.email === adminEmail) return toast.error('Action not permitted!')
        const form = e.target
        const title = form.title.value
        const ratings = Number(form.rating.value)
        const review = form.review.value
        const  reviewerEmail = user?.email
        const reviewerImg = user?.photoURL
        const productAdmin = adminEmail
        const  reviewedProductId = _id


        const productData = {title,ratings,review,reviewerEmail,reviewerImg,reviewedProductId,productAdmin}
        console.table(productData)

        try{
            const {data} = await axiosSecure.post(
                `/review`, productData
            )
            console.log(data)
            toast.success('Review Submitted successfully')
            e.target.reset()
            
        }catch(err){
            console.log(err)
            toast.error(err.message)
            e.target.reset()
        }
    }


      

          
          
    

   
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
        <p className="text-4xl font-bold m-10 text-center">Write a Review</p>
        <button 
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showText ? 'Hide Text' : 'Show Text'}
      </button>
       {showText && (
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md  dark:bg-gray-800">
    

    <form onSubmit={handleReview}>
        <div className="grid grid-cols-1 justify-center items-center">

          <div>
            <label className="text-gray-700 dark:text-gray-200">Rating</label>
             <input 
        type="hidden" 
        name="rating" 
        value={rating} 
      />
            <ReactStars
    count={5}
    value={rating}
    onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
  />
      <p>Your rating: {rating} {rating === 1 ? 'star' : 'stars'}</p>
     
  
          </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200">Review Title</label>
                <input name="title" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>
            <div>
                <label className="text-gray-700 dark:text-gray-200" >Review</label>
                <textarea name="review"  type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>
           



           
        </div>

        <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Submit Review</button>
        </div>
    </form>
</section>
      )}
        </div>
        {/* show the review */}
        <div>
           <p className="text-4xl font-bold m-10 text-center">Customers Review</p>

        </div>
       </div>
       
    );
};

export default ProductDetails;