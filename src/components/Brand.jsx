
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";


const Brand = () => {
    const axiosSecure=useAxiosSecure()
     const [products, setProducts]= useState([]);
      useEffect(()=>{
        const getData = async ()=>{
          const {data}= await axiosSecure (`${import.meta.env.VITE_API_URL}/products`)
          setProducts(data)
        }
        getData()
      },[])
    return (
        <div>
         <div className="flex justify-center items-center mt-20">
            <img className="h-[20vh]" src="https://cdn11.bigcommerce.com/s-hii7479o/images/stencil/original/products/9372/25404/flower__61971.1523314766.png?c=2" alt="" />   
         </div>
        <h1 className='text-2xl font-semibold text-center capitalize font-lato my-6 text-rose-600'>Shop by category</h1>
        <p className=' text-center capitalize font-lato mb-6'>Our products are designed for everyone.</p>
        <div className="flex md:flex-row flex-col justify-center items-center gap-5 ">
            {/* div 1 */}
            <div>
                <div className="relative">
                <img className="h-[500px] w-[500px]" src="https://templates.g5plus.net/glowing-bootstrap-5/assets/images/banner/banner-18.jpg" alt="" />
                {
                    products.filter(p=>p.category === 'Skin Care').map(product=>(
                        <Link to={`/brand/${product.category}`} key={product._id}><div className="flex  justify-center items-center">
                    <button className="absolute  bottom-10 capitalize text-xl font-semibold bg-white rounded-md px-4 text-black hover:bg-rose-400 ">Skin Care</button>
                </div></Link>
                    ))
                }
            </div>
            <div className="relative">
                <img className="h-[500px] w-[500px] mt-5" src="https://templates.g5plus.net/glowing-bootstrap-5/assets/images/banner/banner-15.jpg" alt="" />
                {
                    products.filter(p=>p.category === 'Hair Care').map(product=>(
                        <Link to={`/brand/${product.category}`} key={product._id}><div className="flex justify-center items-center">
                    <button className="absolute bottom-10 capitalize text-xl font-semibold bg-white rounded-md px-4 text-black hover:bg-rose-400 ">Hair Care</button>
                </div></Link>
                    ))
                }
            </div>
            </div>
            {/* div 2 */}
            <div >
                <div className="relative">
                <img className="h-[500px] w-[500px]" src="https://templates.g5plus.net/glowing-bootstrap-5/assets/images/banner/banner-24.jpg" alt="" />
                {
                    products.filter(p=>p.category === 'Body Care').map(product=>(
                        <Link to={`/brand/${product.category}`} key={product._id}><div className="flex justify-center items-center">
                    <button className="absolute bottom-10 capitalize text-xl font-semibold bg-white rounded-md px-4 text-black hover:bg-rose-400 ">body care</button>
                </div></Link>
                    ))
                }
            </div>
            <div className="relative">
                <img className="h-[500px] w-[500px] mt-5" src="https://templates.g5plus.net/glowing-bootstrap-5/assets/images/hero-slider/hero-slider-13.jpg" alt="" />
                {
                    products.filter(p=>p.category === 'Makeup Items').map(product=>(
                        <Link to={`/brand/${product.category}`} key={product._id}><div className="flex justify-center items-center">
                    <button className="absolute bottom-10 capitalize text-xl font-semibold bg-white rounded-md px-4 text-black hover:bg-rose-400 ">Makeup Items</button>
                </div></Link>
                    ))
                }
            </div>
            </div>

        </div>
        </div>
    );
};

export default Brand;