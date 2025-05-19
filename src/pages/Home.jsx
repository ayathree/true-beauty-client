
// import { useLoaderData } from "react-router-dom";
import Brand from "../components/Brand";
import Carousel from "../components/Carousel";
import TabCat from "../components/TabCat";


const Home = () => {
   
   
    return (
        <div>
            <Carousel></Carousel>
            <TabCat ></TabCat>
            <Brand></Brand>
        </div>
    );
};

export default Home;