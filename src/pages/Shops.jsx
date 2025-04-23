import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Shops = () => {
     const [products, setProducts]= useState([]);
     const[itemsPerPage, setItemsPerPage]=useState(6)
     const[currentPage,setCurrentPage]=useState(1)
     const[filter,setFilter]=useState('')
     const[sort,setSort]=useState('')
     const[sortPrice,setSortPrice]=useState('')
     const[filterBrand,setFilterBrand]=useState('')
     const[search,setSearch]=useState('')
     const[searchText,setSearchText]=useState('')
     const[count,setCount]=useState(0)
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
    return (
       <div className="mt-20 mb-10 flex flex-row gap-5 ">
         <aside className="flex flex-col  px-4 py-8  bg-white border-r-2 dark:bg-gray-900 dark:border-gray-700">
    
    <p className="capitalize font-bold">Search by name</p>
    <form onSubmit={handleSearch} className="relative mt-6">

        <input onChange={e=>setSearchText(e.target.value)} value={searchText} type="text" name="search" className="w-full py-2 pr-10 pl-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" />
       <button> <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
        </span></button>
    </form>

    <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
           

            <hr className="my-3 border-gray-200 dark:border-gray-600" />
            <p className="my-6 capitalize font-bold">Search by category</p>
            <select onChange={e=>{setFilter(e.target.value)
                 setCurrentPage(1)}} value={filter} name="category"  className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md dark:bg-gray-800  dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring ">
                    <option value=""></option>
                    {/* {[...new Set(products.map(product => product.category))].map((category, index) => (
                     <option key={index} value={category}>{category}</option>
                    ))} */}
                    <option value="Skin Care">Skin Care</option>
                    <option value="Hair Care">Hair Care</option>
                    <option value="Body Care">Body Care</option>
                    <option value="Makeup Items">Makeup Items</option>
                    
                </select>
                <hr className="mt-9 border-gray-200 dark:border-gray-600" />
            <p className="my-6 capitalize font-bold">Search by Brand</p>
            <select onChange={e=>{setFilterBrand(e.target.value)
                 setCurrentPage(1)}} value={filterBrand} name="brand"  className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md dark:bg-gray-800  dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring ">
                    <option value=""></option>
                    {[...new Set(products.map(product => product.brand))].map((brand, index) => (
                     <option key={index} value={brand}>{brand}</option>
                    ))}
                    
                    
                </select>
            <hr className="mt-9 border-gray-200 dark:border-gray-600" />
            <p className="my-6 capitalize font-bold">Sort by Price</p>
            <select onChange={e=>{setSortPrice(e.target.value)
                 setCurrentPage(1)}} value={sortPrice}  name="price"  className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md dark:bg-gray-800  dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring ">
                    <option value=""></option>
                    <option value="low">Lower To Higher</option>
                    <option value="high">Higher To Lower</option>
                    
                </select>
                <hr className="mt-9 border-gray-200 dark:border-gray-600" />
            <p className="my-6 capitalize font-bold">Sort by offer deadline</p>
            <select onChange={e=>{setSort(e.target.value)
                 setCurrentPage(1)}} value={sort}  name="deadline"  className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md dark:bg-gray-800  dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring ">
                    <option value=""></option>
                    <option value="dsc">Descending Order</option>
                    <option value="asc">Ascending Order </option>
                    
                </select>

              


           
        </nav>
        

       
    </div>
    
</aside>
<div>
    <img className="w-screen object-cover h-[50vh]" src="https://jewelleryishi.myshopify.com/cdn/shop/products/18_bb81cf3a-3cae-46f3-a845-b815b3545706_720x.png?v=1675163888" alt="" />
    <div className="bg-red-300 p-4 mt-4 flex flex-row justify-between items-center">
        <p className="font-bold text-xl">Showing {products.length} of {count} products</p>
        <button onClick={handleReset} className="btn outline-1 capitalize">reset</button>
    </div>
    
    
    {/* card  */}
    <div className="grid grid-cols-3  justify-center items-center gap-3 mt-10 ">
        {
            products.map(product=>(
                <div key={product.key} className="border-black border-2">
                  <div className="flex justify-center items-center">
                  <img src={product.imageUrl} alt="" className="h-[30vh] " />
                  </div>
                 <Link to={`/product/${product._id}`}> <p className="hover:underline hover:font-bold">{product.productName}</p></Link>
                  <p>{product.brand}</p>
                  <p>{product.price} BDT</p>

                </div>
            ))
        }

    </div>
    {/* pagination */}
<div className="flex justify-center items-center mt-10">
    {/* previous */}
    <button onClick={()=>handlePagination(currentPage -1)} className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-red-300 dark:hover:bg-red-300 hover:text-white dark:hover:text-gray-200 disabled:bg-slate-300 disabled:text-slate-50" disabled={currentPage===1}>
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
    <button onClick={()=>handlePagination(currentPage +1)} className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-red-300 dark:hover:bg-red-300 hover:text-white dark:hover:text-gray-200 disabled:bg-slate-300 disabled:text-slate-50" disabled={currentPage === numOfPages}>
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


       </div>
    );
};

export default Shops;