
import Brand from "../components/Brand";
import Carousel from "../components/Carousel";
import NameSlider from "../components/NameSlider";
import TabCat from "../components/TabCat";


const Home = () => {
   
   
    return (
        <div>
            <Carousel></Carousel>
            <TabCat ></TabCat>
            <NameSlider></NameSlider>
            <Brand></Brand>
        </div>
    );
};

export default Home;