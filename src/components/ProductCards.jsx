import { BsCart } from "react-icons/bs";


const ProductCards = ({product}) => {
    const {category}=product || {}

    return (
        <div className="border-2 bg-rose-50 shadow-lg  mx-auto max-w-sm p-6">
            <div className="flex justify-center items-center py-6">
            <img className="h-[300px]   border-2 border-rose-600" src="https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2017/07/1320-09C_HBV_HIR_ROSE_HIBISCUS_4OZ-819x1024.jpg" alt="" />
            </div>
            <h1 className="font-bold text-2xl capitalize">card</h1>
            <p><span className="font-bold">Category :{category}</span> </p>
            <p className="capitalize">Product description and details</p>
            <hr className="mt-2 text-black border border-b-rose-600" />
            <div className="flex  justify-between items-center mt-5 " >
                <p className="font-bold text-2xl">$ price</p>
                <button className="rounded-full  border-2 border-rose-600 btn hover:bg-rose-300">< BsCart className="font-bold text-xl text-rose-600"/></button>

            </div>
        </div>
    );
};

export default ProductCards;