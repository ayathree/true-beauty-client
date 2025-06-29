
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";


const ManageProduct = () => {
    const {user}= useAuth()
    

    const handleFormSubmission=async e=>{
        e.preventDefault()
        const form = e.target
        const productName= form.productName.value
        const price = form.price.value
        const description = form.description.value 
        const category = form.category.value 
        const imageUrl = form.imageUrl.value 
      
        const brand = form.brand.value 
        const adminEmail = user?.email
        const totalOrder = 0
        const productData = {productName,price,description,category,imageUrl,brand,adminEmail,totalOrder}
        console.table(productData)

        try{
            const {data} = await axios.post(
                `${import.meta.env.VITE_API_URL}/products`, productData
            )
            console.log(data)
            toast.success('Product data added successfully')
            e.target.reset()
            
        }catch(err){
            console.log(err)
            e.target.reset()
        }
    }
    return (
        <div className="m-10">
            <h2 className="text-rose-600 text-center capitalize text-2xl font-bold mt-10 underline">Manage Products</h2>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
    

    <form onSubmit={handleFormSubmission}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label className="text-rose-600 dark:text-gray-200" >Product Name</label>
                <input name="productName" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>

            <div>
                <label className="text-rose-600 dark:text-gray-200">Price</label>
                <input name="price" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>

            <div>
                <label className="text-rose-600 dark:text-gray-200" >Description</label>
                <input name="description" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>
            <div>
                <label className="text-rose-600 dark:text-gray-200">Brand</label>
                <select name="brand" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required>
                    <option value=""></option>
                    <option value="x beauty">x beauty</option>
                    <option value="y beauty">y beauty</option>
                    <option value="z beauty">z beauty</option>
                    <option value="w beauty">w beauty</option>
                </select>
            </div>

            <div>
                <label className="text-rose-600 dark:text-gray-200">Category</label>
                <select name="category" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required>
                    <option value=""></option>
                    <option value="Skin Care">Skin Care</option>
                    <option value="Hair Care">Hair Care</option>
                    <option value="Body Care">Body Care</option>
                    <option value="Makeup Items">Makeup Items</option>
                </select>
            </div>
            <div>
                <label className="text-rose-600 dark:text-gray-200">Image Url</label>
                <input name="imageUrl" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " required/>
            </div>
            
        </div>

        <div className="flex justify-end mt-6 gap-2">
            <button className="md:px-8 px-2 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-rose-600 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
            <Link to={'/allProducts'}><button className="md:px-8 px-2 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-rose-600 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">All Products</button></Link>
        </div>
    </form>
</section>
            
        </div>
    );
};

export default ManageProduct;