
import { useLoaderData } from "react-router-dom";
import Carousel from "../components/Carousel";
import TabCat from "../components/TabCat";


const Home = () => {
    const products = useLoaderData()
    console.log(products)
   
    return (
        <div>
            <Carousel></Carousel>
            <TabCat products={products}></TabCat>
        </div>
    );
};

export default Home;