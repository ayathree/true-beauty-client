
import { Link, useLoaderData } from "react-router-dom";


const BrandProducts = () => {
    const products= useLoaderData([])
    console.log(products)
    return (
         <div className=" grid grid-cols-4 gap-7 justify-center items-center py-6 ">
            {
                products.map(product=>(
                    <div key={product._id} >
                    <div className="">
                   <div className="relative">
                     <img className="h-[300px]    border-2 shadow-md" src={product.imageUrl} alt="" />
                       <div className="flex justify-between items-center">
                         <p className="font-bold absolute top-2 left-4 bg-rose-500 px-2 text-white ">{product.price} BDT</p>
                            
                       </div>
                        <p className="font-bold capitalize absolute bottom-2 left-4 bg-rose-500 px-2 text-white">total order: {product.totalOrder} </p>
                   </div>
                    </div>
                     <Link to={`/product/${product._id}`}><h1 title={product.productName} className="mt-3 font-bold text-center capitalize hover:underline text-xl">{product.productName.length > 20 ? `${product.productName.substring(0, 20)}...` : product.productName}</h1></Link>
                    <p className="font-bold text-center capitalize">{product.brand}</p>
                    {/* <p><span className="font-bold">Category :{category}</span> </p> */}
                   
                   
                    
                </div>
                ))
            }
         </div>
    );
};

export default BrandProducts;