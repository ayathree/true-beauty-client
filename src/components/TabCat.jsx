import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import ProductCards from './ProductCards';
import { useEffect, useState } from 'react';
import axios from 'axios';



const TabCat = () => {
  const [products, setProducts]= useState([]);
   const[loader,setLoader]=useState([])
  useEffect(()=>{
     setLoader(true)
    const getData = async ()=>{
      const {data}= await axios(`${import.meta.env.VITE_API_URL}/products`)
      setProducts(data)
       setLoader(false)
    }
    getData()
  },[])
 
    return (
      <Tabs >
      <div className='container px-6 py-10 mx-auto'>
       <div className='flex  justify-center items-center'>
         <img src="https://templates.g5plus.net/glowing-bootstrap-5/assets/images/shop/image-box-01.png" alt="" />
       </div>
        <h1 className='text-2xl font-semibold text-center capitalize font-lato mb-6 text-rose-600 '>best of brands</h1>
        <p className=' text-center capitalize font-lato mb-6'>Here you can find, search your preferable makeup, beauty products with better filter and <br /> additional information about products </p>
      <div className='flex justify-center item-center capitalize'>
      <TabList>
        <Tab>X Beauty</Tab>
        <Tab>Y Beauty</Tab>
        <Tab>Z Beauty</Tab>
        <Tab>W Beauty</Tab>
      </TabList>
  
      </div>
      {loader?(
        <div className="flex justify-center item-center mt-20">
      <span className="loading loading-spinner text-rose-600 loading-lg"></span>
    </div>
      ):(
        <div>
          <TabPanel>
       <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
       {
          products.filter(p=>p.brand === 'x beauty').slice(0, 4).map(product=>(
            <ProductCards key={product._id} product={product}></ProductCards>

          ))
        }
       </div>
      </TabPanel>
      <TabPanel>
      <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
       {
          products.filter(p=>p.brand === 'y beauty').slice(0, 4).map(product=>(
            <ProductCards key={product._id} product={product}></ProductCards>

          ))
        }
        </div>
      </TabPanel>
      <TabPanel>
      <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
       {
          products.filter(p=>p.brand === 'z beauty').slice(0, 4).map(product=>(
            <ProductCards key={product._id} product={product}></ProductCards>

          ))
        }
        </div>
      </TabPanel>
      <TabPanel>
      <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
       {
          products.filter(p=>p.brand === 'w beauty').slice(0, 4).map(product=>(
            <ProductCards key={product._id} product={product}></ProductCards>

          ))
        }
        </div>
        
      </TabPanel>

        </div>
      )}
      
      </div>
    </Tabs>
    );
};

export default TabCat;