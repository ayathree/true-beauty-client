import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";



const Root = () => {
    
    return (
        <div className="font-Literata md:mx-auto md:px-9 px-2">
            <NavBar></NavBar>

           <div className="min-h-[calc(100vh-306px)]"> <Outlet></Outlet></div>
           <div>
           <Footer></Footer>
           </div>
        </div>
    );
};

export default Root;