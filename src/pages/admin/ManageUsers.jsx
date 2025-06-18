// import { useEffect, useState } from "react";
// import { BsCart } from "react-icons/bs";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
// import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { useState } from "react";
// import axios from "axios";


const ManageUsers = () => {
    // const { user } = useAuth();
    // const axiosSecure = useAxiosSecure();
    // const [customers, setCustomers] = useState([]);
    
    
    const {data : users=[], refetch, isError, error,isLoading,}= useQuery({
        queryKey: ['users'],
        queryFn: async()=>{
            
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`)
            return res.data

        }
    })

    const handleMakeAdmin=user=>{
        axios.patch(`${import.meta.env.VITE_API_URL}/users/admin/${user._id}`)
        .then(res=>{
            console.log(res.data)
            if (res.data.modifiedCount > 0) {
                toast.success(`${user.name} is an admin now`)
                refetch()
                
            }
        })
    }
     if(isLoading) return <p>Data is still loading....</p>
    if(isError || error) {
        console.log(isError,error);
    }
      
     
    return (
        <div>
        {
            users.length===0?(<p className="text-rose-600 capitalize text-center text-2xl font-bold mt-20">There is no users</p>):(
                 <div>
                    <h2 className="text-rose-600 text-center capitalize text-2xl font-bold mt-10 underline">All Users</h2>
                
                <section className="container px-4 mx-auto">
        
        <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Customer Image</th>
                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-x-3">
                                            
                                            <span>Customer Name</span>
                                        </div>
                                    </th>
        
                                    
        
                                    
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email</th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Role</th>
        
        
                                    
                                    
        
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                {
                                    users.map(list=>(
                                        <tr key={list._id}>
                                             <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                        <div className="inline-flex items-center gap-x-3">
                                            
        
                                            <div className="flex items-center gap-x-2">
                                                <img className="object-cover w-10 h-10 rounded-full" src={list.photo} alt=""/>
                                                
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                        <div className="inline-flex items-center gap-x-3">
                                            
        
                                            <div className="flex items-center gap-x-2">  
                                                <div>
                                                    <h2  className="font-medium text-gray-800 dark:text-white  ">{list.name}</h2> 
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                   
                                    
                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{list.email}</td>
                                  
                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{list.role}</td>
                                    
        
                                    
                                    
                                   <td className="py-2 px-4 border">
                  {list.role ==='admin'? 'Admin': 
                    <button
                    onClick={()=>handleMakeAdmin(list)}
                     
                      className={`px-3 py-1 rounded ${
                        isLoading 
                          ? 'bg-gray-300 cursor-not-allowed' 
                          : 'bg-rose-500 hover:bg-slate-600 text-white'
                      }`}
                    >
                     Make an admin
                    </button>
                  }
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

export default ManageUsers;