import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import UserStore from "../../store/UserStore.jsx";
import Layout from "../../components/layout/Layout.jsx";
import PropertyList from "../../components/PropertyList/PropertyList.jsx";
import { ContactForm } from "../../components/forms/ContactForm/ContactForm.jsx";
import { Status } from "../../components/Status/Status.jsx";
import { ArrowBackIcon } from "../components/icons/ArrowBackIcon";
import styles from "./Favorites.css";

const Favorites = observer(() => {
  const {
    rootStore: { userStore },
  } = UserStore();

  const [favs, setFavs] = useState([]);
  const [status, setStatus] = useState("loading");

  const getFavorites = async () => {
    try {
      const axios = (await import("axios")).default;
      const { data } = await axios.get("/api/favorites", {
        params: { list: userStore.favorites.join(",") },
      });
      setFavs(data);
      setStatus("finish");
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    if (userStore.favorites.length > 0) {
      getFavorites();
    } else {
      setStatus("empty");
    }
  }, [userStore.favorites]);

  return (
    <Layout>
      <div className={styles.favoritesContainer}>
        <div className={styles.backWrapper}>
          <Link to="/" className={styles.backLink}>
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
            <h1 className={styles.title}>TU SELECCIÓN DE FAVORITAS</h1>

            <PropertyList
              properties={favs}
              filters={false}
              meta={{
                total_count: favs.length,
                limit: 26,
                offset: 0,
                next: "",
                previous: "",
              }}
              saveSearch={false}
              back={false}
              withForm={false}
              withCount={false}
              paddingTop={0}
            />

            <div className={styles.formWrapper}>
              <ContactForm full />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
});

export default Favorites;
