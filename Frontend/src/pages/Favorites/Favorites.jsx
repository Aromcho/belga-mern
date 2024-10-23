import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactForm } from "../../components/forms/ContactForm/ContactForm.jsx";
import { Status } from "../../components/Status/Status.jsx";
import { ArrowBackIcon } from "../components/icons/ArrowBackIcon";
import "./Favorites.css";

const Favorites = observer(() => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (userStore.favorites.length > 0) {
      getFavorites();
    } else {
      setStatus("empty");
    }
  }, [userStore.favorites]);

  return (
    <Layout>
      <div className="{styles.favoritesContainer}">
        <div className="{styles.backWrapper}">
          <Link to="/" className="{styles.backLink}">
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
            <h1 className="{styles.title}">TU SELECCIÓN DE FAVORITAS</h1>

           
            <div className="{styles.formWrapper}">
              <ContactForm full />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
});

export default Favorites;
