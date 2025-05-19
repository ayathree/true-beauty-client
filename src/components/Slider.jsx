import { Link } from "react-router-dom";


const Slider = ({image, text}) => {
    return (
        <div>
            <div
  className="hero min-h-screen  relative"
  style={{
    backgroundImage: `url(${image})`,
    text: 'True Beauty'
   
  }}>
  <div className="hero"></div>
    <p className="text-4xl font-bold absolute top-6 text-white">True Beauty</p>
  <div className="hero-content   text-center ">
    <Link to={'/shops'}><div className="flex justify-center items-center">
     
      
      <button className="  absolute bottom-10   text-black text-3xl font-semibold px-4 py-2  rounded-md bg-white hover:bg-rose-400 capitalize">{text}</button>
    </div></Link>
  </div>
</div>
        </div>
    );
};

export default Slider;