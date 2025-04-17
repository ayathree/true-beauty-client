import { useContext, useState } from "react";

import { useLoaderData, useNavigate } from "react-router-dom";

import { AuthContext } from "../provider/AuthProvider";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast from "react-hot-toast";


const ProductDetails = () => {
    const productData=useLoaderData()
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date());

    const {
        _id, productName, category, price,description,imageUrl, brand, deadline, adminEmail

    }=productData || {}

    console.log(productData)
    

    const handleFormSubmission = async e =>{
        e.preventDefault()
        if (user?.email === adminEmail) return toast.error('Action not permitted!e')
        const form = e.target
        const orderedProductId = _id;
       const customerName = form.name.value;
       const customerAddress = form.address.value;
       const customerNumber = form.phone.value;

        
        const customerEmail = user?.email;
        const ownerEmail = adminEmail;
        const orderDate = startDate;
        const orderedProduct = productName;
        const orderedBrand = brand;
        const orderedPrice = price;
        const productImage = imageUrl;
        const customerImg = user?.photoURL;

       
        const status = 'Pending';
        const productData = {
            orderedProductId,customerName,customerAddress,customerNumber, customerEmail,ownerEmail, orderDate,orderedProduct,orderedBrand, orderedPrice,productImage,customerImg, status
        }

        console.table(productData)

        try{
            const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/order`, productData)
            console.log(data)
            toast.success('Complete Order')
            navigate('/myOrder')

        }catch(err){
            console.log(err)
            toast.error('Sorry There is a Problem')
        }

    }
    return (
        <div className="flex flex-col md:flex-row lg:flex-row justify-around items-center gap-4">
            {/* div 1 */}
            <div>
                <p>{productName}</p>
                <p>{description}</p>
                <p>{brand}</p>
                <img src={imageUrl} alt="" />
                <p>{category}</p>
                <p>{price}</p>
                <p>{new Date (deadline).toLocaleDateString()}</p>
                <p>{adminEmail}</p>
           <p>{_id}</p> 
            </div>
            {/* div 2 */}
           <div>
           <form onSubmit={handleFormSubmission}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label className="text-gray-700 dark:text-gray-200" >Name</label>
                <input name="name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required/>
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200">Address</label>
                <input name="address" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required/>
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" >Phone Number</label>
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
    </form>
           </div>
        </div>
    );
};

export default ProductDetails;