import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";


const MyOrder = () => {
    const {user}=useAuth()
    const [orders, setOrders]=useState([])
    const[isLoading,setIsLoading]=useState([])
    useEffect(()=>{
        getData()
    },[user])
    const getData = async ()=>{
        setIsLoading(true)
        const{data}= await axios(`${import.meta.env.VITE_API_URL}/order/${user?.email}`,
        )
        console.log(data); 
        setOrders(data)
        setIsLoading(false)
    }

    const handleDelete = (id) => {
     Swal.fire({
       title: "Are you sure?",
       text: "You won't be able to revert this!",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Yes, delete it!"
     }).then(async (result) => {
       if (result.isConfirmed) {
         try {
           await axios.delete(`${import.meta.env.VITE_API_URL}/orderData/${id}`);
           
           await Swal.fire({
             title: "Deleted!",
             text: "Your product has been deleted.",
             icon: "success"
           });
           
           getData();
         } catch (err) {
           await Swal.fire({
             title: "Error!",
             text: err.response?.data?.message || "Failed to delete product",
             icon: "error"
           });
         }
       }
     });
   };
    return (
        <div>
        {isLoading?(
            <div className="flex justify-center item-center mt-20">
      <span className="loading loading-spinner text-rose-600  loading-lg"></span>
    </div>
        ):
        orders.length===0?(<p className="text-rose-600 text-center capitalize text-2xl font-bold mt-20">You have not order any product yet</p>) :(<section className="container px-4 mx-auto">
<p className="text-rose-600 text-center capitalize text-2xl font-bold mt-10 underline">Order List</p>
<div className="flex flex-col mt-6">
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-x-3">
                                    
                                    <span>Product Name</span>
                                </div>
                            </th> 
                            
                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Brand</th>
                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Method</th>
                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Price</th>


                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Your Number</th>
                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Your Address</th>
                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <button className="flex items-center gap-x-2">
                                    <span>Status</span>

                                    <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                        <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                        <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                    </svg>
                                </button>
                            </th>

                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {
                            orders.map(order=>(
                                <tr key={order._id}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                    

                                    <div className="flex items-center gap-x-2">  
                                        <div>
                                            <h2 className="font-medium text-gray-800 dark:text-white ">{order.products.map(p=>(<li key={p.id}>{p.name}</li>))}</h2> 
                                        </div>
                                    </div>
                                </div>
                            </td>
                            
                            
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{order.products.map(p=>(<li key={p.id}>{p.brand}</li>))}</td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{order.payment.method}</td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">${order.orderDetails.subtotal}</td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{order.customerInfo.phone}</td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{order.customerInfo.address}</td>

                            <td className="px-12 py-4 text-md  whitespace-nowrap">
                                <div className="flex items-center   gap-x-2 ">
                                   <p className={`px-3 py-1 font-bold ${
                                    order.orderDetails.status === 'Pending' && 'text-orange-500 '
                                   } ${
                                    order.orderDetails.status === 'Shipped' && 'text-blue-600 '}
                                   ${
                                    order.orderDetails.status === 'Delivered' && 'text-green-600 '

                                   } ` }>
                                {order.orderDetails.status}
                                   </p>
                                </div>
                            </td>
                            
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <div className="flex items-center gap-x-6">
                                    <button onClick={()=> handleDelete(order._id)} disabled = {order.orderDetails.status === 'Delivered' || order.orderDetails.status === 'Shipped'} className="text-gray-500 transition-colors disabled:bg-slate-400 duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>

                                    <Link to={`/updateOrder/${order._id}`}><button disabled = {order.orderDetails.status === 'Delivered' || order.orderDetails.status === 'Shipped' } className="text-gray-500 transition-colors disabled:bg-slate-400 duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </button></Link>
                                </div>
                            </td>
                        </tr>
                            ))
                        }

                       
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


</section>)}
        
    </div>
    );
};

export default MyOrder;