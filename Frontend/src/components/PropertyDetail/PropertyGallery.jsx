import React, { useState } from "react";
import Lightbox from "react-spring-lightbox";

const PropertyGallery = ({ property }) => {
  const [modalContent, setModalContent] = useState({
    open: false,
    content: "fotos",
  });
  const [currentImageIndex, setCurrentIndex] = useState(0);

  const photoGallery = property?.photos
    ?.filter((item) => !item.is_blueprint)
    .map((item) => {
      return { src: `${item.image}`, loading: "lazy" };
    });

  const handleClose = () => setModalContent({ open: false });
  const handlePrev = () => currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);
  const handleNext = () => currentImageIndex + 1 < photoGallery.length && setCurrentIndex(currentImageIndex + 1);

  return (
    <div>
      {/* Gallery display logic */}
      <Lightbox
        isOpen={modalContent.open}
        onPrev={handlePrev}
        onNext={handleNext}
        images={photoGallery}
        currentIndex={currentImageIndex}
        onClose={handleClose}
      />
    </div>
  );
};

export default PropertyGallery;
