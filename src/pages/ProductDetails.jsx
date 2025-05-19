// import { useState } from "react";

import {   Link, useLoaderData, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

// import { AuthContext } from "../provider/AuthProvider";

// import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";


import { useEffect, useState } from "react";


const ProductDetails = () => {
    const productData=useLoaderData()
    const {
        _id, productName, category, price,description,imageUrl, brand,  adminEmail

    }=productData || {}

    // console.log(productData)
    const navigate = useNavigate()
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const[products,setProducts]=useState([])
    const [showText, setShowText] = useState(false);
    const [rating, setRating] = useState(0);
    const[reviews,setReviews]=useState([])
    
   
   
    const handleCart = async e =>{
        e.preventDefault()
        if (user?.email === adminEmail) return toast.error('Action not permitted!')
           if (!user) return toast.error('Please Sign In')
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
          if (!user) return toast.error('Please Sign In')
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
            toast.error(err.response?.data)
            e.target.reset()
        }
    }

    // show the review
    useEffect(()=>{
        fetchData()
    },[user])
    const fetchData = async()=>{
        const {data}= await axiosSecure(`/products/${_id}/reviews`)
        setReviews(data)
        fetchData()
    }

      

          
          
    

   
    return (
       <div>
        {/* product detail */}
         
           
            <div className="flex flex-row justify-around items-center ">
              {/* div 1 */}
               <div >
                 <img className="h-[70vh] w-[400px]" src={imageUrl} alt="" />
               </div>
                {/* div 2 */}
                <div  >
                <div className="space-y-3">
                  <p className="bg-rose-500 text-white px-2 w-16">${price}</p>
                  <p className="text-3xl capitalize font-bold ">{productName}</p>
                <p className="text-lg capitalize font-bold text-rose-600">{description}</p>
                
                
                
                <div>
             <button onClick={handleCart} className=" capitalize bg-rose-500 text-white px-4 w-full py-2 text-xl font-semibold hover:bg-rose-300">Add to cart</button>
           
           </div>
                </div>
           <hr  className="border-rose-500 border-b-1 w-full mt-6 "/>
          <div className="mt-6">
             <p className=" capitalize"><span className="font-bold text-xl">Brand:</span> {brand}</p>
                <p className=" capitalize  "><span className="font-bold text-xl" >Category:</span> {category}</p>
          </div>
          
                </div>
            </div>
            <hr className="border-rose-500 border-b-1 w-full mt-6 "/>
          
           
        
        {/* similar product */}
        <div>
            <p className={products.length === 0 ? 'hidden' : 'text-4xl font-bold m-10 text-center mt-20 underline underline-2 text-rose-600'}>You may also like</p>
         <div className="grid grid-cols-4 gap-7 justify-center items-center py-6">
           {
            products.slice(0,4).map(item=> <Link to={`/product/${item._id}`} key={item._id}>
            <div  >
                    <div className="">
                   <div className="relative">
                     <img className="h-[300px]    border-2 shadow-md" src={item.imageUrl} alt="" />
                       <div className="flex justify-between items-center">
                         <p className="font-bold absolute top-2 left-4 bg-rose-500 px-2 text-white ">{item.price} BDT</p>
                            
                       </div>
                        <p className="font-bold capitalize absolute bottom-2 left-4 bg-rose-500 px-2 text-white">total order: {item.totalOrder} </p>
                   </div>
                    </div>
                     <Link to={`/product/${item._id}`}><h1 title={item.productName} className="mt-3 font-bold text-center capitalize hover:underline text-xl">{item.productName.length > 20 ? `${item.productName.substring(0, 20)}...` : item.productName}</h1></Link>
                    <p className="font-bold text-center capitalize">{item.brand}</p>
                    {/* <p><span className="font-bold">Category :{category}</span> </p> */}
                   
                   
                    
                </div></Link>)
          }
         </div>
      
        </div>
        
        {/* review of customer */}
        <div>
        <p className="text-4xl font-bold m-20 text-center underline underline-2 text-rose-600 ">Write a Review</p>
        <div className="flex justify-center items-center">
          <button 
        onClick={handleClick}
        className="px-4 py-2 bg-rose-500 text-white "
      >
        {showText ? 'Done' : 'Write'}
      </button>
        </div>
       {showText && (
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md  dark:bg-gray-800">
    

    <form onSubmit={handleReview}>
        <div className="grid grid-cols-1 justify-center items-center">

          <div>
            <label className="text-rose-600 text-lg font-semibold dark:text-gray-200">Rating</label>
             <div className="flex justify-start items-center gap-5">
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
    activeColor="#ec1a44"
  />
      <p className="font-semibold">Your rating: <span className="text-rose-600">{rating}</span> <span className="text-rose-600">{rating === 1 ? 'star' : 'stars'}</span></p>
             </div>
     
  
          </div>

            <div>
                <label className="text-rose-600 text-lg font-semibold dark:text-gray-200">Review Title</label>
                <input name="title" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>
            <div>
                <label className="text-rose-600 text-lg font-semibold dark:text-gray-200" >Review</label>
                <textarea name="review"  type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>
           



           
        </div>

        <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-rose-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Submit Review</button>
        </div>
    </form>
</section>
      )}
        </div>
       
        {/* show the review */}
        <div>
           <p className={reviews.length === 0 ? 'hidden' : 'text-4xl font-bold m-10 text-center mt-20 underline underline-2 text-rose-600'}>Customers Review</p>
          {
            reviews.map(review=>(
               <div key={review._id}>
            <section className="bg-white dark:bg-gray-900">
    <div className="container px-6 py-10 mx-auto">
        

        <section className="grid grid-cols-1 gap-5 mt-8 xl:mt-5 lg:grid-cols-2 xl:grid-cols-3">
            
         
                

                <div className="flex items-center mt-3 -mx-2">
                    <img className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 dark:ring-gray-700" src={review.reviewerImg} alt=""/>

                    <div className="mx-2">
                       <div className="flex justify-center items-center gap-5">
                         <h1 className="font-semibold text-gray-800 dark:text-white">{review.title} </h1>
                         <ReactStars
                          count={5}
                          value={review.ratings}  // Use 'value' instead of 'onChange' for display
                          edit={false}           // Disable editing if just displaying
                          size={24}
                          activeColor="#ec1a44"
                        />
                       </div>
                         <span className="text-sm text-gray-500 dark:text-gray-400">{review.reviewerEmail}</span>
                      
                    </div>
                    
                </div>
           
        </section>
                <p className="mt-4">{review.review}</p>
    </div>
</section>
<hr className="border-rose-600"/>
           </div>
            ))
          }

        </div>
       </div>
       
    );
};

export default ProductDetails;