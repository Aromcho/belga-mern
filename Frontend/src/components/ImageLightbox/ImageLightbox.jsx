import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Close as CloseIcon } from '@mui/icons-material';

const ImageLightbox = ({ isOpen, setIsOpen, photos, selectedImageIndex, setSelectedImageIndex }) => {
    const totalImages = photos.length;
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const isDragging = useRef(false);

    const handlePrevImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
    };

    // Manejo de eventos táctiles
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        handleSwipe();
    };

    // Manejo de eventos de mouse (arrastrar)
    const handleMouseDown = (e) => {
        isDragging.current = true;
        touchStartX.current = e.clientX;
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        touchEndX.current = e.clientX;
    };

    const handleMouseUp = () => {
        if (isDragging.current) {
            handleSwipe();
            isDragging.current = false;
        }
    };

    // Determinar dirección del deslizamiento
    const handleSwipe = () => {
        const threshold = 50; // Sensibilidad al deslizamiento
        if (touchStartX.current - touchEndX.current > threshold) {
            handleNextImage(); // Deslizar a la izquierda (imagen siguiente)
        } else if (touchEndX.current - touchStartX.current > threshold) {
            handlePrevImage(); // Deslizar a la derecha (imagen anterior)
        }
    };

    return (
        <Dialog
            style={{ zIndex: 100000001 }}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            maxWidth="lg"
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                },
            }}
            BackdropProps={{
                style: {
                    backgroundColor: 'rgba(0, 0, 0, 0.98)',
                },
            }}
        >
            <DialogContent
                style={{
                    margin: 0,
                    padding: 0,
                    overflow: 'hidden',
                    backgroundColor: 'transparent',
                }}
            >
                <div
                    className="dialog-image-container p-0 m-0"
                    style={{ position: 'relative', textAlign: 'center', userSelect: 'none' }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    {/* Contador de imágenes */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '10px',
                            left: '20px',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            padding: '5px 10px',
                            borderRadius: '5px',
                        }}
                    >
                        {selectedImageIndex + 1}/{totalImages}
                    </div>

                    <IconButton
                        style={{ position: 'absolute', top: 0, right: 0, color: 'white' }}
                        onClick={() => setIsOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton>

                    <IconButton
                        style={{ position: 'absolute', top: '50%', left: 0, color: 'white' }}
                        onClick={handlePrevImage}
                    >
                        <ArrowBackIos />
                    </IconButton>
                    <IconButton
                        style={{ position: 'absolute', top: '50%', right: 0, color: 'white' }}
                        onClick={handleNextImage}
                    >
                        <ArrowForwardIos />
                    </IconButton>

                    <img
                        src={photos[selectedImageIndex].image}
                        alt={`Property Image ${selectedImageIndex}`}
                        style={{ width: 'auto', height: 'auto', maxHeight: '90vh', cursor: 'grab', userSelect: 'none' }}
                        draggable="false" // Evita que se arrastre la imagen
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ImageLightbox;
