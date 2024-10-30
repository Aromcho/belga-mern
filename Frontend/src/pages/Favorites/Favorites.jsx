import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap"; // Importa los componentes de Bootstrap
import FormContact from "../../components/FormContact/FormContact.jsx";
import { Status } from "../../components/Status/Status.jsx";
import { ArrowBackIcon } from "../../components/Icons/Icons.jsx";
import Item from "../../components/Item/Item.jsx"; // Asegúrate de importar el componente Item
import "./Favorites.css";

const Favorites = () => {
  const [status, setStatus] = useState("loading");
  const [favorites, setFavorites] = useState([]);
  const [properties, setProperties] = useState([]);

  const redirectToPropertyList = () => {
    window.location.href = "/propertylist";
  };


  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/cookies/get-products", { credentials: "include" });
        if (!response.ok) {
          throw new Error("Error al obtener los favoritos");
        }
        const data = await response.json();
        if (data.products && data.products.length > 0) {
          setFavorites(data.products); // Almacena los productos favoritos
          setStatus("loading-properties");
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

  useEffect(() => {
    if (status === "loading-properties") {
      const fetchProperties = async () => {
        try {
          const propertyDetails = await Promise.all(
            favorites.map(async (fav) => {
              const response = await fetch(`/api/property/${fav.id}`); // Ruta para obtener propiedad por ID
              if (!response.ok) {
                throw new Error(`Error al obtener la propiedad con ID: ${fav.id}`);
              }
              return await response.json(); // Devuelve la propiedad completa
            })
          );
          setProperties(propertyDetails); // Almacena las propiedades completas
          setStatus("finish");
        } catch (error) {
          console.error("Error al obtener detalles de propiedades:", error);
          setStatus("empty");
        }
      };

      fetchProperties();
    }
  }, [favorites, status]);

  return (
    <>
      <div className="favoritesContainer">
        <div className="backWrapper mt-5 pt-5 text-black">
          <Link to="/" className="backLink text-black p-5 m-5">
            <ArrowBackIcon />
            Volver al inicio
          </Link>
        </div>

        {status === "loading" && <Status text="Cargando..." />}
        {status === "empty" && (
          <div className="mb-5">
            <Status
          img="/images/empty_img_heart.gif"
          text="Tené a mano tus propiedades favoritas."
          textButton="AGREGÁ TUS FAVORITAS"
        />
         <Container className="img-cont-busquedas" >
                <button onClick={redirectToPropertyList} className="btn-busquedas-guardadas">AGREGÁ TUS FAVORITAS</button>
              </Container>
        </div>
          
        )}
        {status === "finish" && (
          <div className="pt-5 mt-5">
            <h1 className="title-fav">TU SELECCIÓN DE FAVORITAS</h1>

            <Container>
              <Row>
                {properties.map((property) => (
                  <Col md={6} key={property.id} className="mb-4"> {/* Cada columna tendrá un tamaño de 6 para hacer dos columnas */}
                    <Item property={property} /> {/* Pasar las propiedades completas a Item */}
                  </Col>
                ))}
              </Row>
            </Container>

            <div className="formWrapper">
              <FormContact full />
            </div>
          </div>
        )}
        
      </div>
    </>
  );
};

export default Favorites;
