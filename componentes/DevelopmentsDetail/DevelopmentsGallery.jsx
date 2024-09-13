import React, { useState } from "react";
import Lightbox from "react-spring-lightbox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { ArrowSubmitIcon, CloseIcon } from "../icons";
import { GalleryProp, ArrowGallery, HeaderGallery, IndexCounter, SwiperContainerGallery, MediaImg, IframeWrapper } from "./styles";

const DevelopmentsGallery = ({ property }) => {
  const [modalContent, setModalContent] = useState({
    open: false,
    content: "fotos",
  });
  const [currentImageIndex, setCurrentIndex] = useState(0);

  const images = property?.photos?.map((item) => ({
    src: item.image,
    loading: "lazy",
  }));

  const videos = property?.videos?.map((item) => (
    <IframeWrapper key={item.id}>
      <iframe src={item.player_url} />
    </IframeWrapper>
  ));

  const onClose = () => setModalContent({ open: false });

  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);
  const gotoNext = () =>
    currentImageIndex + 1 < images.length && setCurrentIndex(currentImageIndex + 1);

  return (
    <GalleryProp>
      <Lightbox
        isOpen={modalContent.open}
        images={images}
        currentIndex={currentImageIndex}
        onPrev={gotoPrevious}
        onNext={gotoNext}
        onClose={onClose}
        renderHeader={() => (
          <HeaderGallery>
            <IndexCounter>{currentImageIndex + 1} de {images.length}</IndexCounter>
            <CloseIcon onClick={onClose} />
          </HeaderGallery>
        )}
        renderPrevButton={() => (
          <ArrowGallery onClick={gotoPrevious} className={currentImageIndex === 0 ? "disabled" : ""}>
            <ArrowSubmitIcon />
          </ArrowGallery>
        )}
        renderNextButton={() => (
          <ArrowGallery onClick={gotoNext} className={currentImageIndex + 1 === images.length ? "disabled" : ""}>
            <ArrowSubmitIcon />
          </ArrowGallery>
        )}
      />
      <SwiperContainerGallery>
        <Swiper
          modules={[Navigation]}
          loop
          centeredSlides={images.length + videos.length === 1}
          navigation
        >
          {videos.length > 0 && videos.map((item, k) => <SwiperSlide key={k}>{item}</SwiperSlide>)}
          {images.length > 0 && images.map((item, k) => (
            <SwiperSlide key={k} onClick={() => setModalContent({ open: true, content: "fotos" })}>
              <MediaImg style={{ backgroundImage: `url(${item.src})` }} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainerGallery>
    </GalleryProp>
  );
};

export default DevelopmentsGallery;
