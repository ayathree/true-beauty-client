// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slider from './Slider';


const Carousel = () => {
    const bgImg1 = 'https://dominique.com/cdn/shop/files/Group1.jpg?height=466&v=1746146210&width=700';
   const bgImg2 = 'https://dominique.com/cdn/shop/files/satinrougr.jpg?v=1746052594&width=1024';
   const bgImg3 = 'https://dominique.com/cdn/shop/products/2_ef02a08c-6647-491c-aec1-3f279d3b3d00.jpg?v=1644588259&width=1024'
    return (
        <>
        <div className='container px-6 py-10 mx-auto '>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide >
            <Slider image={bgImg1} text={'shop now'}></Slider>
        </SwiperSlide>
        <SwiperSlide>
            <Slider image={bgImg2} text={'shop now'}></Slider>
        </SwiperSlide>
        <SwiperSlide>
            <Slider image={bgImg3} text={'shop now'}></Slider>
        </SwiperSlide>
        
      </Swiper>
        </div>
    </>
    );
};

export default Carousel;