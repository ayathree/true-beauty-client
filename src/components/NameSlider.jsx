import Slider from "react-slick";
 

const NameSlider = () => {
    const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
  };
    return (
       <div>
         <h1 className="capitalize font-bold text-3xl text-rose-600 text-center mt-16 underline">Featured in</h1>
      <div className="bg-rose-500 p-5 slider-container mt-5">
            
            <Slider {...settings}>
                 <div className="p-2 mt-40">
                    <p className="text-6xl text-center text-white font-bold capitalize">
                        
                       x beauty 
                        
                    </p>
                </div>
                <div className="p-2">
                    <img
                        src="https://i.ibb.co/0hDsn2v/slider4.jpg"
                        alt=""
                        className="w-full h-auto max-h-[400px] object-cover mx-auto"
                    />
                </div>
                <div className="p-2 mt-40">
                    <p className="text-6xl text-center text-white font-bold capitalize">
                        
                       y beauty 
                        
                    </p>
                </div>
                <div className="p-2">
                    <img
                        src="https://i.ibb.co/68N7W3D/slider1.jpg"
                        alt=""
                        className="w-full h-auto max-h-[400px] object-cover mx-auto"
                    />
                </div>
                <div className="p-2 mt-40">
                    <p className="text-6xl text-center text-white font-bold capitalize">
                        
                       w beauty 
                        
                    </p>
                </div>
                <div className="p-2">
                    <img
                        src="https://i.ibb.co/0cHg9JN/slider3.jpg"
                        alt=""
                        className="w-full h-auto max-h-[400px] object-cover mx-auto"
                    />
                </div>
                <div className="p-2 mt-40">
                    <p className="text-6xl text-center text-white font-bold capitalize">
                        
                       z beauty 
                        
                    </p>
                </div>
                <div className="p-2">
                    <img
                        src="https://i.ibb.co/yR4sF1j/slider5.jpg"
                        alt=""
                        className="w-full h-auto max-h-[400px] object-cover mx-auto"
                    />
                </div>
                
            </Slider>
        </div>
       </div>
    );
};

export default NameSlider;