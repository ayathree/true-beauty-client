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
             if (!user) return toast.error('Please Sign In')   
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
       <div className="   mx-auto max-w-sm p-6 ">
            <div className="flex justify-center items-center py-6">
           <div className="relative">
             <img className="h-[300px]    border-2 shadow-md" src={imageUrl} alt="" />
               <div className="flex justify-between items-center">
                 <p className="font-bold absolute top-2 left-4 bg-rose-500 px-2 text-white ">{price} BDT</p>
                    <button onClick={handleWish} className=" absolute top-2 right-4 text-rose-600 text-xl hover:text-2xl"><FaRegHeart /></button>
               </div>
                <p className="font-bold capitalize absolute bottom-2 left-4 bg-rose-500 px-2 text-white">total order: {totalOrder} </p>
           </div>
            </div>
             <Link to={`/product/${_id}`}><h1 title={productName} className="font-bold text-center capitalize hover:underline text-xl">{productName.length > 20 ? `${productName.substring(0, 20)}...` : productName}</h1></Link>
            <p className="font-bold text-center capitalize">{brand}</p>
            {/* <p><span className="font-bold">Category :{category}</span> </p> */}
           
           
            
        </div>
    );
};

export default ProductCards;