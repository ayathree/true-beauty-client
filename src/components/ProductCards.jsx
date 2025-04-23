import { BsCart } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";


const ProductCards = ({product}) => {
    const {_id, productName, brand, price, imageUrl,totalOrder}=product || {}
    console.log(product)

    return (
        <div className="border-2 bg-rose-50 shadow-lg  mx-auto max-w-sm p-6">
            <div className="flex justify-center items-center py-6">
            <img className="h-[300px]   border-2 border-rose-600" src={imageUrl} alt="" />
            </div>
            <h1 className="font-bold text-2xl capitalize">{productName}</h1>
            <p className="font-bold text-xl capitalize">{brand}</p>
                <p className="font-bold text-2xl">total order:{totalOrder} </p>
            {/* <p><span className="font-bold">Category :{category}</span> </p> */}
           
            <hr className="mt-2 text-black border border-b-rose-600" />
            <div className="flex  justify-between items-center mt-5 " >
                <p className="font-bold text-2xl">{price} BDT</p>
                <div className="flex justify-end items-end gap-3">
                <Link to={`/product/${_id}`}><button className="hover:text-white text-rose-600 bg-rose-200 border-2 border-rose-600 btn hover:bg-rose-300 flex justify-center items-center gap-2">Details<FaArrowRight className="font-bold text-xl text-rose-600"/></button></Link>
                <button className="rounded-full  border-2 border-rose-600 btn hover:bg-rose-300">< BsCart className="font-bold text-xl text-rose-600"/></button>
                </div>

            </div>
        </div>
    );
};

export default ProductCards;