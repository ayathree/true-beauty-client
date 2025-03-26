

const Slider = ({image, text}) => {
    return (
        <div>
            <div
  className="hero min-h-screen"
  style={{
    backgroundImage: `url(${image})`,
   
  }}>
  <div className="hero"></div>
  <div className="hero-content   text-center">
    <div className="">
     
      
      <div to={''} className=" bg-rose-500 text-white text-3xl font-semibold py-2 px-4 rounded-md outline outline-2 capitalize">{text}</div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Slider;