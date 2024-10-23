import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ItemDetail from '../ItemDetail/ItemDetail.jsx';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const { id } = useParams();  // Captura el ID desde la URL
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mover el scroll a la parte superior cuando la página se cargue
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Solicitar la propiedad por ID
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/property/${id}`);  // Asegúrate que este endpoint sea correcto
        const data = await response.json();

        if (response.ok) {
          setProperty(data);
        } else {
          setError('Propiedad no encontrada');
        }
      } catch (error) {
        setError('Error al cargar la propiedad');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();  // Solo busca la propiedad si existe un ID
    }
  }, [id]);

  // Si está cargando
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si hubo un error
  if (error) {
    return (
      <div>
        <p>{error}. Volviendo a la lista de propiedades...</p>
        <button onClick={() => navigate(-1)}>Volver a la lista</button>
      </div>
    );
  }

  // Si no se encontró la propiedad
  if (!property) {
    return (
      <div>
        <p>No se encontró la propiedad. Volviendo a la lista de propiedades...</p>
        <button onClick={() => navigate(-1)}>Volver a la lista</button>
      </div>
    );
  }

  // Mostrar el detalle de la propiedad
  return (
    <div className="item-detail-container pt-5">
      <ItemDetail property={property} />
    </div>
  );
};

export default ItemDetailContainer;
