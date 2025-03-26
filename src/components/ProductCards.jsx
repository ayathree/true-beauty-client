import { BsCart } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";


const ProductCards = ({product}) => {
    const {_id,}=product || {}
    console.log(product)

    return (
        <Link to={`/product/${_id}`} className="border-2 bg-rose-50 shadow-lg  mx-auto max-w-sm p-6">
            <div className="flex justify-center items-center py-6">
            <img className="h-[300px]   border-2 border-rose-600" src="https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2017/07/1320-09C_HBV_HIR_ROSE_HIBISCUS_4OZ-819x1024.jpg" alt="" />
            </div>
            <h1 className="font-bold text-2xl capitalize">card</h1>
            {/* <p><span className="font-bold">Category :{category}</span> </p> */}
           
            <hr className="mt-2 text-black border border-b-rose-600" />
            <div className="flex  justify-between items-center mt-5 " >
                <p className="font-bold text-2xl">$ price</p>
                <div className="flex justify-end items-end gap-3">
                <button className="text-white  border-2 border-rose-600 btn hover:bg-rose-300 flex justify-center items-center gap-2">Details<FaArrowRight className="font-bold text-xl text-rose-600"/></button>
                <button className="rounded-full  border-2 border-rose-600 btn hover:bg-rose-300">< BsCart className="font-bold text-xl text-rose-600"/></button>
                </div>

            </div>
        </Link>
    );
};

export default ProductCards;