import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './sliderCardGallery.css';

const SliderCardGallery = ({ img, className, galleryLink }) => {
  return (
    <div className="swiper-container-gallery">
      <Swiper
        className={`swiper--images-gallery ${className}`}
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        centeredSlides={false}
        allowTouchMove={true}
        navigation={{}}
      >
        {img?.map((i, k) => (
          <SwiperSlide key={k}>
            {galleryLink ? (
              <div className="wrapper-image">
                <div className="overlay-hover">MÁS INFO</div>
                <a className='link--gallery' href={galleryLink} target={"_blank"} rel="noreferrer"></a>
                <div className="slide-container" style={{ backgroundImage: `url(${i})` }}></div>
              </div>
            ) : (
              <div className="slide-container" style={{ backgroundImage: `url(${i})` }}></div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderCardGallery; // Asegúrate de exportar el componente como default
