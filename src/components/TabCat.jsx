import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import ProductCards from './ProductCards';


const TabCat = () => {
 
    return (
      <Tabs>
      <div className='container px-6 py-10 mx-auto'>
        <h1 className='text-2xl font-semibold text-center capitalize font-lato mb-6'>Search Products by category</h1>
        <p className=' text-center capitalize font-lato mb-6'>Here you can find, search your preferable makeup, beauty products with better filter and <br /> additional information about products and offers</p>
      <div className='flex justify-center item-center capitalize'>
      <TabList  >
        <Tab>Skin Care</Tab>
        <Tab>Hair Care</Tab>
        <Tab>Body Care</Tab>
        <Tab>Makeup Items</Tab>
      </TabList>
  
      </div>
      <TabPanel>
        <ProductCards></ProductCards>
      </TabPanel>
      <TabPanel>
        <h2>Any content 2</h2>
      </TabPanel>
      <TabPanel>
        <h2>Any content 2</h2>
      </TabPanel>
      <TabPanel>
        <h2>Any content 2</h2>
      </TabPanel>
      </div>
    </Tabs>
    );
};

export default TabCat;