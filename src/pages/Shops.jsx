import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
// import useAxiosSecure from "../hooks/useAxiosSecure";


const Shops = () => {
    const {user} = useAuth()
        // const axiosSecure = useAxiosSecure()
        const [wishes, setWishes] =useState([])
     const [products, setProducts]= useState([]);
     const[itemsPerPage]=useState(6)
     const[currentPage,setCurrentPage]=useState(1)
     const[filter,setFilter]=useState('')
     const[sort,setSort]=useState('')
     const[sortPrice,setSortPrice]=useState('')
     const[filterBrand,setFilterBrand]=useState('')
     const[search,setSearch]=useState('')
     const[searchText,setSearchText]=useState('')
     const[count,setCount]=useState(0)
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    //  for pagination
      useEffect(()=>{
        const getData = async ()=>{
          const {data}= await axios (`${import.meta.env.VITE_API_URL}/allData?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&sort=${sort}&sortPrice=${sortPrice}&filterBrand=${filterBrand}&search=${search}`)
          setProducts(data)
          
        }
        getData()
      },[currentPage,itemsPerPage,filter,sort,sortPrice,filterBrand,search])
      //   for count
      useEffect(()=>{
          const getCount = async ()=>{
              const {data}= await axios (`${import.meta.env.VITE_API_URL}/dataCount?filter=${filter}&filterBrand=${filterBrand}&search=${search}`)
              
              setCount(data.count)
            }
            getCount()
        },[filter,filterBrand,search])
        console.log(count);
        const numOfPages =Math.ceil(count/itemsPerPage)
      const pages = [...Array(numOfPages).keys()].map(element => element+1)
    //   handle pagination
    const handlePagination=(value)=>{
        console.log(value)
        setCurrentPage(value)

    }
    // search
    const handleSearch=e=>{
        e.preventDefault()
        
        setSearch(searchText)
    }
    console.log(search);
    // reset button
    const handleReset=()=>{
        setFilter('')
        setFilterBrand('')
        setSort('')
        setSortPrice('')
        setSearch('')
        setSearchText('')
     
    }
    // handle wish
    // const handleWish = async e =>{
    //     e.preventDefault()
    //     if (user?.email === adminEmail) return toast.error('Action not permitted!')
    //     // const form = e.target
    //     const listedProductId = _id; 
    //     const listerEmail = user?.email;
    //     const owner = adminEmail;
    //     const listedProduct = productName;
    //     const listedBrand = brand;
    //     const listedPrice = price;
    //     const productImage = imageUrl;
    //     const listedData = {
    //         listedProductId,listerEmail,owner, listedProduct, listedBrand,listedPrice,productImage
    //     }

    //     console.table(listedData)

    //     try{
    //         const {data}= await axiosSecure.post(`/wish`, listedData)
    //         console.log(data)
    //         toast.success('added in wishList')

    //         // navigate('/wishList')

    //     }catch(err){
    //         console.log(err)
    //         toast.error(err.response.data)
            
    //     }

    // }

    useEffect(()=>{
        const getData = async ()=>{
          const {data}= await axios (`${import.meta.env.VITE_API_URL}/products`)
          setWishes(data)
        }
        getData()
      },[])
      console.log(wishes);

    const handleWish = async (productId) => {
        // 1. Get the product directly (no validation)
        const product = wishes.find(item => item._id === productId);
        if (user?.email === product.adminEmail) return toast.error('Action not permitted!')
             if (!user) return toast.error('Please Sign In')
      
        // 2. Prepare cart data
        const listedData = {
            listedProductId: product._id,
            listerEmail: user?.email,
          owner: product.adminEmail,
          listedProduct: product.productName,
          listedBrand: product.brand,
          listedPrice: product.price,
          productImage: product.imageUrl,
          
        };
      
        // 3. Send to backend
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/wish`, listedData);
            console.log(data);
            toast.success('Add in wish list successfully!');
           
          } catch (err) {
            console.error('failed:', err);
            toast.error(err.response?.data?.message || 'Failed');
          }
      };
    return (
       <div className="lg:mt-20 mt-10 mb-10 flex lg:flex-row flex-col gap-5 ">
         <aside className="flex flex-col px-4 py-8 bg-white lg:border-r-2 border-rose-600 dark:bg-gray-900 dark:border-gray-700">
  {/* Mobile Toggle Button (Hidden on Desktop) */}
  <div className="lg:hidden flex justify-center mb-4">
    <button 
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      className="text-rose-600 hover:text-rose-800"
    >
      {isSidebarOpen ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <div className="btn bg-rose-500 text-white capitalize font-bold hover:bg-slate-500">
            filter options
        </div>
      )}
    </button>
  </div>

  {/* Sidebar Content - Hidden on mobile when closed */}
  <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
    {/* Search by Name */}
    <div className="mb-8">
      <p className="capitalize font-bold text-rose-600 text-sm md:text-base">Search by name</p>
      <form onSubmit={handleSearch} className="relative mt-2 md:mt-4">
        <input 
          onChange={e => setSearchText(e.target.value)} 
          value={searchText} 
          type="text" 
          name="search" 
          className="w-full py-2 pr-10 pl-4 text-sm md:text-base text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" 
          placeholder="Search" 
        />
        <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      </form>
    </div>

    {/* Filters */}
    <div className="space-y-6 md:space-y-8">
      {/* Category Filter */}
      <div>
        <p className="capitalize font-bold text-rose-600 text-sm md:text-base mb-2 md:mb-4">Search by category</p>
        <select 
          onChange={e => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }} 
          value={filter} 
          name="category"  
          className="block w-full px-3 py-2 text-sm md:text-base bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
        >
          <option value="">All Categories</option>
          <option value="Skin Care">Skin Care</option>
          <option value="Hair Care">Hair Care</option>
          <option value="Body Care">Body Care</option>
          <option value="Makeup Items">Makeup Items</option>
        </select>
      </div>

      {/* Brand Filter */}
      <div>
        <p className="capitalize font-bold text-rose-600 text-sm md:text-base mb-2 md:mb-4">Search by Brand</p>
        <select 
          onChange={e => {
            setFilterBrand(e.target.value);
            setCurrentPage(1);
          }} 
          value={filterBrand} 
          name="brand"  
          className="block w-full px-3 py-2 text-sm md:text-base bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
        >
          <option value="">All Brands</option>
          {[...new Set(products.map(product => product.brand))].map((brand, index) => (
            <option key={index} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {/* Price Sort */}
      <div>
        <p className="capitalize font-bold text-rose-600 text-sm md:text-base mb-2 md:mb-4">Sort by Price</p>
        <select 
          onChange={e => {
            setSortPrice(e.target.value);
            setCurrentPage(1);
          }} 
          value={sortPrice}  
          name="price"  
          className="block w-full px-3 py-2 text-sm md:text-base bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
        >
          <option value="">Default</option>
          <option value="low">Lower To Higher</option>
          <option value="high">Higher To Lower</option>
        </select>
      </div>
    </div>
  </div>
</aside>
<div>
    <img className="w-screen object-cover h-[50vh]" src="https://uploads.dovetale.com/brand-profile-media/b50674e5ad1b4e40f49a9fcd72c594a6.jpg" alt="" />
    <div className="bg-rose-500 p-4 mt-4 flex md:flex-row flex-col justify-between items-center gap-2">
        <p className="font-bold text-xl text-white">Showing <span className="text-3xl">{products.length}</span> of <span className="text-3xl">{count}</span> products</p>
        <button onClick={handleReset} className="btn outline-1 capitalize text-rose-700">reset</button>
    </div>
    
    
    <div>
        {
            products.length===0?(<p className="text-rose-600 capitalize text-center text-2xl font-bold mt-20">There are no Items and products in shop store</p>):(
                <div>
                {/* card  */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1  justify-center items-center gap-3 mt-10 ">
        {
            products.map(product=>(
               <div key={product._id} className="   mx-auto max-w-sm p-6 ">
            <div className="flex justify-center items-center py-6">
           <div className="relative">
             <img className="h-[300px]    border-2 shadow-md" src={product.imageUrl} alt="" />
               <div className="flex justify-between items-center">
                 <p className="font-bold absolute top-2 left-4 bg-rose-500 px-2 text-white ">${product.price}</p>
                    <button onClick={() => handleWish(product._id)} className=" absolute top-2 right-4 text-rose-600 text-xl hover:text-2xl"><FaRegHeart /></button>
               </div>
                <p className="font-bold capitalize absolute bottom-2 left-4 bg-rose-500 px-2 text-white">total order: {product.totalOrder} </p>
           </div>
            </div>
             <Link to={`/product/${product._id}`}><h1 title={product.productName} className="font-bold text-center capitalize hover:underline text-xl">{product.productName.length > 20 ? `${product.productName.substring(0, 20)}...` : product.productName}</h1></Link>
            <p className="font-bold text-center capitalize">{product.brand}</p>
            {/* <p><span className="font-bold">Category :{category}</span> </p> */}
           
           
            
        </div>
            ))
        }

    </div>
    {/* pagination */}
<div className="flex justify-center items-center mt-10">
    {/* previous */}
    <button onClick={()=>handlePagination(currentPage -1)} className="px-4 py-2 mx-1 text-white transition-colors duration-300 transform bg-rose-600 rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-red-300 dark:hover:bg-red-300 hover:text-white dark:hover:text-gray-200 disabled:bg-slate-300 disabled:text-slate-50" disabled={currentPage===1}>
        <div className="flex items-center -mx-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-1 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>

            <span className="mx-1">
                Previous
            </span>
        </div>
    </button>


   {/* button */}
   {
    pages.map(page=>(
    <a onClick={()=> handlePagination(page)} key={page} href="#" className= {`${currentPage === page ? "bg-red-300 text-white":""}hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-red-300 dark:hover:bg-red-300 hover:text-white dark:hover:text-gray-200`}>
        {page}
    </a>

    ))
   }
{/* next */}
    <button onClick={()=>handlePagination(currentPage +1)} className="px-4 py-2 mx-1 text-white transition-colors duration-300 transform bg-rose-500 rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-red-300 dark:hover:bg-red-300 hover:text-white dark:hover:text-gray-200 disabled:bg-slate-300 disabled:text-slate-50" disabled={currentPage === numOfPages}>
        <div className="flex items-center -mx-1">
            <span className="mx-1">
                Next
            </span>

            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-1 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </div>
    </button>
</div>
                </div>
            )
        }
    </div>
</div>


       </div>
    );
};

export default Shops;