import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import Swal from "sweetalert2";


const DashBoard = () => {
    const{user}=useAuth()
    const axiosSecure = useAxiosSecure()
    const[payments, setPayments]=useState([])
        useEffect(()=>{
            getData()
        },[user])
        const getData = async()=>{
            const {data}= await axiosSecure(`/payData/${user?.email}`)
            setPayments(data)
        }
        console.log(payments);
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
             await axiosSecure.delete(`/payData/${id}`);
             
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
             {
                payments.length===0?(<p className="text-rose-600 capitalize text-center text-2xl font-bold mt-20">There are no transaction histories</p>):(
                   <div>
                     <h2 className="text-rose-600 text-center capitalize text-2xl font-bold mt-10 underline">Transaction dashboard</h2>
                   <section className="container px-4 mx-auto">
            
            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-x-3">
                                                
                                                <span>Customer Email</span>
                                            </div>
                                        </th>
            
                                        
            
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            
                                            Product Ids
            
                                               
                                            
                                        </th>
            
                                        {/* <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Product Image</th> */}
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Transaction Id</th>
            
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Paid Amount</th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Date</th>
                                        
            
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {
                                        payments.map(payment=>(
                                            <tr key={payment._id}>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                
            
                                                <div className="flex items-center gap-x-2">
                                                    <div>
                                                        <h2 className="font-medium text-gray-800 dark:text-white ">{payment.email}</h2>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{payment.productId.map(p=>(<li key={p.id}>{p}</li>))}</td>
                                       
                                        
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{payment.transactionId}</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">${payment.price}</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{payment.date}</td>
                                        
                                        
                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                       <div className="flex items-center gap-x-6">
                                           <button onClick={()=> handleDelete(payment._id)}  className="text-gray-500 transition-colors disabled:bg-slate-400 duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                   <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                               </svg>
                                           </button>
        
                                          
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
            
           
            </section>
                   </div>
                )
             }
            
        </div>
    );
};

export default DashBoard;