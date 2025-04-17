import axios from "axios";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";


const UpdateOrder = () => {
     const editData= useLoaderData()
     const navigate = useNavigate()
     const {_id,customerName,customerAddress,customerNumber} = editData || {}
     const handleFormSubmission=async e=>{
        e.preventDefault()
        const form = e.target
        const customerName= form.customerName.value
        const customerNumber = form.customerNumber.value
        const customerAddress = form.customerAddress.value 
        
        const orderData = {customerName,customerNumber,customerAddress}
        console.table(orderData)

        try{
            const {data} = await axios.patch(
                `${import.meta.env.VITE_API_URL}/orderData/${_id}`, orderData
            )
            console.log(data)
            toast.success('Data updated successfully')
            navigate('/myOrder')
            
        }catch(err){
            console.log(err)
            toast.error(err.message)
        }
    }
    return (
        <div className="m-10">
             <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
             <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Update Order Data</h2>
            <form onSubmit={handleFormSubmission}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label className="text-gray-700 dark:text-gray-200" >Your Name</label>
                <input name="customerName" defaultValue={customerName} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200">Phone Number</label>
                <input name="customerNumber" defaultValue={customerNumber} type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" >Address</label>
                <input name="customerAddress" defaultValue={customerAddress} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>
           
        </div>

        <div className="flex justify-end mt-6 gap-2">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Edit</button>
           
        </div>
    </form>
    </section>
            
        </div>
    );
};

export default UpdateOrder;