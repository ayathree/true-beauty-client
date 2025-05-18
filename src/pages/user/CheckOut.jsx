import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PayCheckOutForm from "./PayCheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const CheckOut = () => {
    
    const navigate = useNavigate();
const { user } = useAuth();
const axiosSecure = useAxiosSecure();
const [startDate] = useState(new Date()); // Removed setStartDate if not needed
const [items, setItems] = useState([]);
const [subtotal, setSubtotal] = useState(0);
const [shippingFee] = useState(150); // Made constant if not changing
const [total, setTotal] = useState(0);
const [showText, setShowText] = useState(false);
const [useStripePayment, setUseStripePayment] = useState(false);
const [paymentMethod, setPaymentMethod] = useState({
  status: 'pending',
  method: 'Cash on Delivery'
});

// Fetch cart data
useEffect(() => {
  getData();
}, [user]);

const getData = async () => {
  try {
    const { data } = await axiosSecure(`/checkOutData/${user?.email}`);
    setItems(data);
  } catch (error) {
    console.error('Failed to fetch cart data:', error);
    toast.error('Failed to load your cart');
  }
};

// Calculate prices whenever items change
useEffect(() => {
  const calculatedSubtotal = items.reduce(
    (sum, item) => sum + (item.savedPrice * item.quantity),
    0
  );
  setSubtotal(calculatedSubtotal);
  setTotal(calculatedSubtotal + shippingFee);
}, [items, shippingFee]);

const handleFormSubmission = async (e) => {
  e.preventDefault();
  
  // Validation checks
  if (!user?.email) {
    return toast.error('You must be logged in to place an order');
  }

  if (items.length === 0) {
    return toast.error('Your cart is empty');
  }

  // Prevent owners from ordering their own products
  const isOrderingOwnProducts = items.some(item => user.email === item.ownerEmail);
  if (isOrderingOwnProducts) {
    return toast.error("You can't order your own products");
  }

  const form = e.target;
  // Determine payment method
  const paymentMethod = useStripePayment 
    ? { status: 'paid', method: 'Stripe' }
    : { status: form.delivery?.value || 'pending', method: 'Cash on Delivery' };
  
  // Prepare order data
  const orderData = {
    customerInfo: {
      name: form.name.value,
      address: form.address.value,
      phone: form.phone.value,
      city:form.city.value,
      zipCode:form.zip.value,
      email: user.email,
      image: user.photoURL
    },
    payment:  paymentMethod,
    orderDetails: {
      date: startDate,
      status: 'Pending',
      subtotal,
      shippingFee,
      total
    },
    products: items.map(item => ({
      id: item.savedProductId,
      name: item.savedProduct,
      brand: item.savedBrand,
      price: item.savedPrice,
      quantity: item.quantity,
      image: item.productImage,
      owner: item.owner
    }))
  };

  try {
    const { data } = await axiosSecure.post('/order', orderData);
    console.log(data);
    toast.success('Order placed successfully!');
    navigate('/myOrder');
  } catch (err) {
    console.error('Order failed:', err);
    toast.error(err.response?.data?.message || 'Failed to place order');
  }
};
        // handle Delete
          const handleDelete = async (id) => {
            try {
                const { data } = await axiosSecure.delete(`/cartData/${id}`);
                console.log(data);
                getData();
                toast.success('Deleted successfully');
            } catch (err) {
                console.log(err.message);
                toast.error(err.message);
            }
        }; 
        
        const handleClick = () => {
    setShowText(!showText);
     setUseStripePayment(!useStripePayment); // Toggles the state between true/false
  };
// change the cash on delivery method after payment
  const handlePaymentMethodChange = (isStripe) => {
  setPaymentMethod({
    status: isStripe ? 'paid' : 'pending',
    method: isStripe ? 'Stripe' : 'Cash on Delivery'
  });
  setUseStripePayment(isStripe);
  setShowText(isStripe);
};
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
                                                        <h2  className="font-medium text-gray-800 dark:text-white ">{item.savedProduct}</h2> 
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
                                                <button onClick={() => handleDelete(item._id)}  className="text-gray-500 transition-colors disabled:bg-slate-400 duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
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
            <form onSubmit={handleFormSubmission} >
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:mx-56 border-gray-200 border-2 p-5 rounded-lg">
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
                <label className="text-gray-700 dark:text-gray-200" >Your City</label>
                <select name="city" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required>
                    <option value=""></option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Sylet">Sylet</option>
                </select>
            </div>
            <div>
                <label className="text-gray-700 dark:text-gray-200" >Zip Code</label>
                <input name="zip" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required/>
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200">Order Date</label>
                <DatePicker className='border p-2 rounded-md' selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div>
            <label className="text-gray-700 dark:text-gray-200">Payment Method <span className="text-green-700">(Before pay please fill up the form)</span></label>
           <br />
           <div className="mt-2 flex items-center gap-3">
           <button onClick={(e) => {
        e.preventDefault();
        handlePaymentMethodChange(true);
        handleClick();
      }} className="btn bg-slate-700 text-white hover:bg-slate-500" disabled={!items.length}>Strip Payment</button>
          {!useStripePayment && (
      <>
        <input 
          type="checkbox" 
          name="delivery" 
          value="delivery" 
          onChange={() => handlePaymentMethodChange(false)}
          required={!useStripePayment} 
        />
        <label>Cash On Delivery</label>
      </>
    )}

           </div>

            </div>
        </div>

        <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Complete Order</button>
        </div>
    </form>
    {
        showText && (
            <div className="m-20 border-2 border-slate-300 rounded-lg p-4">
           <Elements stripe={stripePromise}>
            <PayCheckOutForm  total={total} ids={items.map(item=>(item._id))} owners={items.map(item=>(item.owner))}></PayCheckOutForm>

           </Elements>
        </div>

        )
    }

            
        </div>
    
    );
};

export default CheckOut;