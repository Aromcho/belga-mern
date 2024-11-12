import React, { useState } from 'react';
import Button from '../../Button/Button.jsx';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Close as CloseIcon } from '@mui/icons-material';
import './Contenido.css';

const Contenido = ({
    age,
    total_surface,
    bathroom_amount,
    parking_lot_amount,
    toilet_amount,
    expenses,
    bedrooms,
    tags,
    roofed_surface,
    semiroofed_surface,
    rich_description,
    disposition,
    orientation,
    property_condition,
    planos = []
  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Función para abrir y cerrar el modal
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    // Funciones para navegar entre las imágenes del modal
    const handlePrevImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? planos.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex === planos.length - 1 ? 0 : prevIndex + 1));
    };

    return (
      <div className="property-container">
        <div className="property-features bg-white">
          <div className="property-info flex-row-wrap">
            {age > 0 && (
              <div className="info-item text-center">
                <img className="icon-image" src='/images/icons/prop_antiguedad.svg' alt="Antigüedad" />
                <p className="text-muted">Antigüedad</p>
                <span className="text-muted">{age === 0 ? 'A estrenar' : `${age} años`}</span>
              </div>
            )}
            {total_surface > 0 && (
              <div className="info-item text-center">
                <img className="icon-image" src='/images/icons/prop_m2.svg' alt="Superficie Total" />
                <p className="text-muted">M2 Totales</p>
                <span className="text-muted">{Math.round(total_surface)}</span>
              </div>
            )}
            {bedrooms > 0 && (
              <div className="info-item text-center">
                <img className="icon-image" src='/images/icons/prop_cuarto.svg' alt="Dormitorios" />
                <p>{bedrooms > 1 ? 'Dormitorios' : 'Dormitorio'}</p>
                <span>{bedrooms}</span>
              </div>
            )}
            {bathroom_amount > 0 && (
              <div className="info-item text-center">
                <img className="icon-image" src='/images/icons/prop_ducha.svg' alt="Baños" />
                <p className="text-muted">{bathroom_amount > 1 ? 'Baños' : 'Baño'}</p>
                <span className="text-muted">{bathroom_amount}</span>
              </div>
            )}
            {parking_lot_amount > 0 && (
              <div className="info-item text-center">
                <img className="icon-image" src='/images/icons/prop_cochera.svg' alt="Cochera" />
                <p className="text-muted">{parking_lot_amount > 1 ? 'Cocheras' : 'Cochera'}</p>
                <span className="text-muted">{parking_lot_amount}</span>
              </div>
            )}
            {toilet_amount > 0 && (
              <div className="info-item text-center">
                <img className="icon-image" src='/images/icons/prop_toilette.svg' alt="Toilettes" />
                <p className="text-muted">Toilettes</p>
                <span className="text-muted">{toilet_amount}</span>
              </div>
            )}
            {expenses > 0 && (
              <div className="info-item text-center">
                <img className="icon-image" src="/images/icons/prop_expensas.svg" alt="Expensas" />
                <p className="text-muted">Expensas</p>
                <span className="text-muted">{expenses.toLocaleString("es-ES")}</span>
              </div>
            )}
          </div>
          {/* Botón para abrir el modal de planos */}
          {planos && planos.length > 0 && (
            <div className='button-planos-cont'>
              <Button 
                className="button-planos text-decoration-none" 
                text="Planos"
                type='outline'
                onClick={handleModalOpen}
              >
                Planos
              </Button>
            </div>
          )}
          {/* Modal de planos */}
          <Dialog style={{ zIndex:100000001 }} open={isModalOpen} onClose={handleModalClose} maxWidth="md">
            <DialogContent style={{ padding: 0, overflow: "hidden"  }}>
              <div className="dialog-image-container" style={{ position: 'relative', textAlign: 'center' }}>
                {/* Contador de imágenes */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '20px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '5px 10px',
                  borderRadius: '5px'
                }}>
                  {selectedImageIndex + 1}/{planos.length}
                </div>

                {/* Botón de cerrar */}
                <IconButton style={{ position: 'absolute', top: 0, right: 0, color: 'black' }} onClick={handleModalClose}>
                  <CloseIcon />
                </IconButton>

                {/* Botones de navegación */}
                <IconButton style={{ position: 'absolute', top: '50%', left: 0, color: 'black' }} onClick={handlePrevImage}>
                  <ArrowBackIos />
                </IconButton>
                <IconButton style={{ position: 'absolute', top: '50%', right: 0, color: 'black' }} onClick={handleNextImage}>
                  <ArrowForwardIos />
                </IconButton>

                {/* Imagen actual, verificando que exista */}
                {planos[selectedImageIndex]?.image && (
                  <img
                    src={planos[selectedImageIndex].image}
                    alt={`Plano ${selectedImageIndex + 1}`}
                    style={{ width: '100%', height: 'auto', maxHeight: '90vh' }}
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Información de detalles y descripción */}
        <div className="property-details p-4 ">
          <div className="info-section">
            <h2 className="mb-4 text-dark">Información</h2>
            <div className="info-details">
              {bathroom_amount > 0 && <p><strong className='negrita'>Ambientes: </strong>{bathroom_amount}</p>}
              {disposition && <p><strong className='negrita'>Disposición: </strong>{disposition}</p>}
              {orientation && <p><strong className='negrita'>Orientación: </strong>{orientation}</p>}
              {property_condition && <p><strong className='negrita'>Condición: </strong>{property_condition}</p>}
            </div>
          </div>
      
          <div className="info-section">
            <h2 className="mb-4 text-dark">Superficies</h2>
            <div className="info-details">
              {roofed_surface > 0 && <p><strong className='negrita'>Sup. Cubierta: </strong>{roofed_surface.slice(0, -3)} m2</p>}
              {semiroofed_surface > 0 && <p><strong className='negrita'>Sup. Semicubierta: </strong>{semiroofed_surface.slice(0, -3)} m2</p>}
              {total_surface > 0 && <p><strong className='negrita'>Sup. Total: </strong>{total_surface.slice(0, -3)} m2</p>}
            </div>
          </div>
        </div>
      
        {tags && tags.length > 0 && (
          <div className="property-tags bg-white p-4">
            <h2 className="mb-4">Adicionales</h2>
            <div className="tags-container flex-row-wrap">
              {tags.map((tag, index) => (
                <div key={index} className="tag-item">{tag.name}</div>
              ))}
            </div>
          </div>
        )}
      
        <div className="property-description bg-white p-4 rounded-3">
          <h2 className='mb-3'>Descripción</h2>
          <p dangerouslySetInnerHTML={{ __html: rich_description }}></p>
        </div>
      </div>
    );
  };
  
export default Contenido;
