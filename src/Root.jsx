import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import AI from "./components/AI";
import useAuth from "./hooks/useAuth";




const Root = () => {
    const{user}=useAuth()
    
    
    return (
    <div>
        {
            user?<><AI></AI></>:<></>
        }
        <div className="font-Literata md:mx-auto md:px-9 px-2">
            
            <NavBar></NavBar>

           <div className="min-h-[calc(100vh-306px)]"> <Outlet></Outlet></div>
           <div>
           <Footer></Footer>
           </div>
        </div>
    </div>
        
    );
};

export default Root;