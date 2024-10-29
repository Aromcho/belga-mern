import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormContact from "../../components/FormContact/FormContact.jsx";
import { Status } from "../../components/Status/Status.jsx";
import { ArrowBackIcon } from "../../components/Icons/Icons.jsx";
import "./Favorites.css";

const Favorites = () => {
  const [status, setStatus] = useState("loading");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/cookies/get-products', { credentials: 'include' });
        if (!response.ok) {
          throw new Error('Error al obtener los favoritos');
        }
        const data = await response.json();
        if (data.products.length > 0) {
          setFavorites(data.products);
          setStatus("finish");
        } else {
          setStatus("empty");
        }
      } catch (error) {
        console.error("Error al obtener favoritos:", error);
        setStatus("empty");
      }
    };

    fetchFavorites();
  }, []);

  return (
    <>
      <div className="favoritesContainer">
        <div className="backWrapper">
          <Link to="/" className="backLink">
            <ArrowBackIcon />
            Volver al inicio
          </Link>
        </div>

        {status === "loading" && <Status text="Cargando..." />}
        {status === "empty" && (
          <Status
            img="/images/empty_img_heart.gif"
            text="Tené a mano tus propiedades favoritas."
            textButton="AGREGÁ TUS FAVORITAS"
            buttonStyle="secondary shine"
            linkButton="/venta"
          />
        )}
        {status === "finish" && (
          <>
            <h1 className="title">TU SELECCIÓN DE FAVORITAS</h1>

            <div className="favorites-list">
              {favorites.map((property) => (
                <div key={property.id} className="favorite-item">
                  <Link to={`/propiedad/${property.id}`} state={{ property }}>
                    <img src={property.photos[0] || "/default-image.jpg"} alt={property.name} />
                    <div className="property-info">
                      <h2>{property.name}</h2>
                      <p>Precio: ${property.price}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="formWrapper">
              <FormContact full />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Favorites;
