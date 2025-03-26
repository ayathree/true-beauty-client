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
    const bgImg1 = 'https://images.unsplash.com/photo-1526045405698-cf8b8acc4aaf?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
   const bgImg2 = 'https://images.unsplash.com/photo-1585687635785-994bda55c78e?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
   const bgImg3 = 'https://images.unsplash.com/photo-1555050455-f96634b5cba6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
            <Slider image={bgImg1} text={'Get your ideal makeup products'}></Slider>
        </SwiperSlide>
        <SwiperSlide>
            <Slider image={bgImg2} text={'Choose perfect shade for your skin tone'}></Slider>
        </SwiperSlide>
        <SwiperSlide>
            <Slider image={bgImg3} text={'Authentic and trustable items for you'}></Slider>
        </SwiperSlide>
        
      </Swiper>
        </div>
    </>
    );
};

export default Carousel;