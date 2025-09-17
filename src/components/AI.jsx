import { useState } from "react";
import { useNavigate } from "react-router-dom";
import open from '../assets/button-305770.mp3'
import toast from "react-hot-toast";


const AI = () => {
    const {showSearch, setShowSearch}=useState(false)
    const[activeAI,setActiveAI]=useState(false)
    const navigate=useNavigate()
    const openingSound=new Audio(open)

    function speak(message){
        let utterance=new SpeechSynthesisUtterance(message)
        window.speechSynthesis.speak(utterance)
    }

    const speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition=new speechRecognition()
    if(!recognition){
        console.log("not supported");
        toast.error("Not Supported.Please Open In Chrome")
    }

    recognition.onresult=(e)=>{
        console.log(e);
        const transcript=e.results[0][0].transcript.trim();
        if(transcript.toLowerCase().includes("collections") || transcript.toLowerCase().includes("shops") || transcript.toLowerCase().includes("products") || transcript.toLowerCase().includes("allproducts") || transcript.toLowerCase().includes("collection") || transcript.toLowerCase().includes("stores") || transcript.toLowerCase().includes("store") || transcript.toLowerCase().includes("shop") || transcript.toLowerCase().includes("product") || transcript.toLowerCase().includes("allproduct")){
            speak("opening store page")
            navigate('/shops')
            setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("about") || transcript.toLowerCase().includes('aboutpage')){
            speak("opening about page")
            navigate("/about")
            setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("cart") || transcript.toLowerCase().includes("kaat") || transcript.toLowerCase().includes("caat")){
            speak("opening your cart")
            navigate("/myCart")
            setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("order") || transcript.toLowerCase().includes("myorders") || transcript.toLowerCase().includes("orders") || transcript.toLowerCase().includes("my order")){
            speak("opening your order page")
            navigate("/myOrder")
            setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("transaction") || transcript.toLowerCase().includes("mybill") || transcript.toLowerCase().includes("history") || transcript.toLowerCase().includes("payment")){
            speak("opening your transaction page")
            navigate("/myTransaction")
            setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("wishlist") || transcript.toLowerCase().includes("wish") || transcript.toLowerCase().includes("selected items") || transcript.toLowerCase().includes("selection")){
            speak("opening your wishlist page")
            navigate("/wishList")
            setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("contact") || transcript.toLowerCase().includes("contacts")){
            speak("opening contact page")
            navigate("/contact")
            setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("home") || transcript.toLowerCase().includes("home") || transcript.toLowerCase().includes("main")){
            speak("opening home page")
            navigate("/")
            setShowSearch(false)
        }
        else{
            toast.error("Try Again")
        }

    }

    recognition.onend=()=>{
        setActiveAI(false)
    }

    return (
        <div className="fixed lg:bottom-[40px] md:bottom-[40px] bottom-[80px] left-[4%] z-[10] " onClick={()=>{recognition.start(); openingSound.play()
            setActiveAI(true)
        }}>
            <img src="https://i.ibb.co.com/4gDx4Xx7/image.png" alt="" className={`w-[100px] cursor-pointer border-[5px] border-[#663333] rounded-full ${activeAI ? 'translate-x-[10%] translate-y-[-10%] scale-125' : 'translate-x-[0] translate-y-[0] scale-100'} transition-transform`} style={{
                filter:`${activeAI ? "drop-shadow(0px 0px 20px #00d2fc)":"drop-shadow(0px 0px 20px black)"}`
            }} />
        </div>
    );
};

export default AI;