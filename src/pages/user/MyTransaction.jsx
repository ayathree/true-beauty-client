import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
// import useAxiosSecure from "../../hooks/useAxiosSecure";



const MyTransaction = () => {
     const{user}=useAuth()
    // const axiosSecure = useAxiosSecure()
    const[payments, setPayments]=useState([])
            useEffect(()=>{
                getData()
            },[user])
            const getData = async()=>{
                const {data}= await axios(`${import.meta.env.VITE_API_URL}/paymentData/${user?.email}`)
                setPayments(data)
            }
            console.log(payments);
             
    return (
        <div>
          {
            payments.length===0?(<p className="text-rose-600 text-center text-2xl capitalize font-bold mt-20">You have no transaction histories yet</p>):(
                 <div>
                     <p className="text-rose-600 text-center capitalize text-2xl font-bold my-10 underline">Transaction Histories</p>
             <p className="text-green-700 font-bold text-xl text-center">(Histories will automatically delete after 30 days)</p>
            <section className="container px-4 mx-auto">
            
            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        
            
                                        
            
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            
                                            Product Ids
            
                                               
                                            
                                        </th>
            
                                        {/* <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Product Image</th> */}
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Transaction Id</th>
            
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Paid Amount</th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Date</th>
                                        
            
                                       
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {
                                        payments.map(payment=>(
                                            <tr key={payment._id}>
                                        
                                        
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{payment.productId.map(p=>(<li key={p.id}>{p}</li>))}</td>
                                       
                                        
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{payment.transactionId}</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">${payment.price}</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{payment.date}</td>
                                        
                                        
                                        
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

export default MyTransaction;