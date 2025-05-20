// import axios from "axios";



import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const UpdateProducts = () => {
    const editData= useLoaderData()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const {_id,productName,price,description,category,imageUrl,brand} = editData || {}
    

     const handleFormSubmission=async e=>{
        e.preventDefault()
        const form = e.target
        const productName= form.productName.value
        const price = form.price.value
        const description = form.description.value 
        const category = form.category.value 
        const imageUrl = form.imageUrl.value 
        const brand = form.brand.value
       
        // const adminEmail = user?.email
        const productData = {productName,price,description,category,imageUrl,brand}
        console.table(productData)

        try{
            const {data} = await axiosSecure.put(
                `${import.meta.env.VITE_API_URL}/products/${_id}`, productData
            )
            console.log(data)
            toast.success('Product data added successfully')
            navigate('/allProducts')
            
        }catch(err){
            console.log(err)
            toast.error(err.message)
        }
    }
    return (
        <div className="m-10">
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
    <h2 className="text-lg font-semibold text-rose-600 capitalize dark:text-white">Update Products</h2>

    <form onSubmit={handleFormSubmission}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label className="text-rose-600 dark:text-gray-200" >Product Name</label>
                <input name="productName" defaultValue={productName} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>

            <div>
                <label className="text-rose-600 dark:text-gray-200">Price</label>
                <input name="price" defaultValue={price} type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>

            <div>
                <label className="text-rose-600 dark:text-gray-200" >Description</label>
                <input name="description" defaultValue={description} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>
            <div>
                <label className="text-rose-600 dark:text-gray-200" >Brand</label>
                <input name="brand" defaultValue={brand} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>

            <div>
                <label className="text-rose-600 dark:text-gray-200">Category</label>
                <select name="category" defaultValue={category} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required>
                    <option value=""></option>
                    <option value="Skin Care">Skin Care</option>
                    <option value="Hair Care">Hair Care</option>
                    <option value="Body Care">Body Care</option>
                    <option value="Makeup Items">Makeup Items</option>
                </select>
            </div>
            <div>
                <label className="text-rose-600 dark:text-gray-200">Image Url</label>
                <input name="imageUrl" defaultValue={imageUrl} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>
           
        </div>

        <div className="flex justify-end mt-6 gap-2">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-rose-600 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Edit</button>
           
        </div>
    </form>
</section>
            
        </div>
    );
};

export default UpdateProducts;
