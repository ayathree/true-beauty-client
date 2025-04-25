// import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const CheckOut = () => {
    
    // const navigate = useNavigate()
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const [startDate, setStartDate] = useState(new Date());
    // const handleFormSubmission = async e =>{
    //     e.preventDefault()
    //     if (user?.email === ownerEmail) return toast.error('Action not permitted!e')
    //     const form = e.target
    //     const orderedProductId = _id;
    //    const customerName = form.name.value;
    //    const customerAddress = form.address.value;
    //    const customerNumber = form.phone.value;

        
    //     const customerEmail = user?.email;
    //     const ownerEmail = adminEmail;
    //     const orderDate = startDate;
    //     const orderedProduct = productName;
    //     const orderedBrand = brand;
    //     const orderedPrice = price;
    //     const productImage = imageUrl;
    //     const customerImg = user?.photoURL;

       
    //     const status = 'Pending';
    //     const productData = {
    //         orderedProductId,customerName,customerAddress,customerNumber, customerEmail,ownerEmail, orderDate,orderedProduct,orderedBrand, orderedPrice,productImage,customerImg, status
    //     }

    //     console.table(productData)

    //     try{
    //         const {data}= await axiosSecure.post(`/order`, productData)
    //         console.log(data)
    //         toast.success('Complete Order')

    //         navigate('/myOrder')

    //     }catch(err){
    //         console.log(err)
    //         toast.error(err.response.data)
    //         e.target.reset()
    //     }

    // }
    const [items, setItems]=useState([])
    const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(150); // Default shipping fee
  const [total, setTotal] = useState(0);
    useEffect(()=>{
            getData()
        },[user])
        const getData = async ()=>{
            const{data}= await axiosSecure(`/checkOutData/${user?.email}`,
               
            )
            setItems(data)
        }
        // calculation of price
        useEffect(() => {
            const calculatedSubtotal = items.reduce(
              (sum, item) => sum + (item.savedPrice * item.quantity),
              0
            );
            setSubtotal(calculatedSubtotal);
            setTotal(calculatedSubtotal + shippingFee);
          }, [items, shippingFee]);
    return (
        <div>
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
                                                
                                                <span>Product Name</span>
                                            </div>
                                        </th>
            
                                        
            
                                        
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Product Image</th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Brand</th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Price</th>
            
            
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Quantity</th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Action</th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Total</th>
            
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {
                                        items.map(item=>(
                                            <tr key={item._id}>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                
            
                                                <div className="flex items-center gap-x-2">  
                                                    <div>
                                                        <h2 className="font-medium text-gray-800 dark:text-white ">{item.savedProduct}</h2> 
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                
            
                                                <div className="flex items-center gap-x-2">
                                                    <img className="object-cover w-10 h-10 rounded-full" src={item.productImage} alt=""/>
                                                    
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.savedBrand}</td>
                                      
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.savedPrice} BDT</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.quantity}</td>
                                        
            
                                        
                                        
                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center gap-x-6">
                                                <button   className="text-gray-500 transition-colors disabled:bg-slate-400 duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
            
                                                
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{(item.savedPrice * item.quantity).toLocaleString('en-BD')} BDT</td>
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
{/* price count */}
            <div className="flex flex-row justify-end items-end gap-6  m-10">
                <div>
                    <p className="text-blue-600" >SubTotal</p>
                    <p className="text-green-600">Shipping Fee</p>
                    <p className="text-red-600">Total</p>
                </div>
                <div>
                    <p className="text-blue-600">{subtotal.toLocaleString('en-BD')} BDT</p>
                    <p className="text-green-600">{shippingFee.toLocaleString('en-BD')} BDT</p>
                    <p className="text-red-600">{total.toLocaleString('en-BD')} BDT</p>
                </div>
                

            </div>
            {/* customer info */}
            {/* <form >
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label className="text-gray-700 dark:text-gray-200" >Your Name</label>
                <input name="name" type="text"  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required/>
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200">Your Address</label>
                <input name="address" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required/>
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" >Your Phone Number</label>
                <input name="phone" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required/>
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200">Order Date</label>
                <DatePicker className='border p-2 rounded-md' selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
        </div>

        <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Complete Order</button>
        </div>
    </form> */}

            
        </div>
    
    );
};

export default CheckOut;