// import { BsCart } from "react-icons/bs";
// import { FaArrowRight } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Link, } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";


const ProductCards = ({product}) => {
    const {_id, productName, brand, price, imageUrl,totalOrder, adminEmail}=product || {}
    console.log(product)
    // const navigate = useNavigate()
        const {user} = useAuth()
        const axiosSecure = useAxiosSecure()
        const handleWish = async e =>{
            e.preventDefault()
            if (user?.email === adminEmail) return toast.error('Action not permitted!')
            // const form = e.target
            const listedProductId = _id; 
            const listerEmail = user?.email;
            const owner = adminEmail;
            const listedProduct = productName;
            const listedBrand = brand;
            const listedPrice = price;
            const productImage = imageUrl;
            const listedData = {
                listedProductId,listerEmail,owner, listedProduct, listedBrand,listedPrice,productImage
            }
    
            console.table(listedData)
    
            try{
                const {data}= await axiosSecure.post(`/wish`, listedData)
                console.log(data)
                toast.success('added in wishList')
    
                // navigate('/wishList')
    
            }catch(err){
                console.log(err)
                toast.error(err.response.data)
                
            }
    
        }


    return (
        <Link to={`/product/${_id}`}><div className="border-2 bg-rose-50 shadow-lg  mx-auto max-w-sm p-6 hover:border-red-400">
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
                {/* <button className="hover:text-white text-rose-600 bg-rose-200 border-2 border-rose-600 btn hover:bg-rose-300 flex justify-center items-center gap-2">Details<FaArrowRight className="font-bold text-xl text-rose-600"/></button> */}
                <div>
                    <button onClick={handleWish} className="btn hover:bg-red-400"><FaRegHeart /></button>
                  </div>
                </div>

            </div>
        </div></Link>
    );
};

export default ProductCards;