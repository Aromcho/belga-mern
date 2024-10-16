import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ItemDetail from '../ItemDetail/ItemDetail.jsx';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Verifica si location.state está disponible y contiene property
  const property = location.state?.property;

  // Mover el scroll a la parte superior cuando la página se cargue
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Si no hay datos de propiedad, redirige a la lista de propiedades o muestra un mensaje
  if (!property) {
    // Podrías redirigir al usuario a la lista de propiedades o mostrar un mensaje de error
    return (
      <div>
        <p>No se encontró la propiedad. Volviendo a la lista de propiedades...</p>
        <button onClick={() => navigate(-1)}>Volver a la lista</button>
      </div>
    );
  }

  return (
    <div className="item-detail-container pt-5">
      <ItemDetail property={property} />
    </div>
  );
};

export default ItemDetailContainer;
