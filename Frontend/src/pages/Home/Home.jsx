import React, { useEffect, useState } from "react";
import axios from "axios";
import CardProp from "../../components/CardProp/CardProp.jsx";
import Title from "../../components/Title/Title.jsx";
import BackToTop from "../../components/BackToTop/BackToTop.jsx";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import UserStore from "../../store/UserStore.jsx";
import { useMergeState } from "../../helpers/hooks";
import SearchHomeForm from "../../components/SearchHomeForm/SearchHomeForm.jsx";
import SocialSidebar from "../../components/SocialSidebar/SocialSidebar.jsx";
import SelectionListContainer from "../../components/SelectionListContainer/SelectionListContainer.jsx";
import Button from "../../components/Button/Button.jsx";

import "./Home.css";

const Home = observer(() => {
  const { favorites, toggleFavorite } = UserStore;
  const navigate = useNavigate();

  const [formData, setFormData] = useMergeState({
    locations: [],
    min_rooms: "",
    max_rooms: "",
    operation_type: [1],
    property_type: 0,
    price_from: 0,
    price_to: 0,
  });

  const [close, setClose] = useMergeState({
    rooms: undefined,
  });

  const [properties, setProperties] = useState([]);
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [barrios, setBarrios] = useState([]);

  useEffect(() => {
    // Obtener propiedades
    axios('/api/properties')
      .then(({ data }) => {
        setProperties(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('Error fetching properties:', err);
        setProperties([]);
      });

    // Obtener emprendimientos
    axios('/api/properties')
      .then(({ data }) => {
        setEmprendimientos(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('Error fetching emprendimientos:', err);
        setEmprendimientos([]);
      });

    // Obtener barrios
    axios('/api/neighborhoods')
      .then(({ data }) => {
        setBarrios(data);
      })
      .catch(err => console.error('Error fetching neighborhoods:', err));
  }, []);

  const localidades = barrios.map((item) => ({
    value: item?.location_id,
    label: item?.location_name,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/propertylist");
  };

  return (
    <div className="layout transparent">
      <div className="hero-wrapper">
        <video autoPlay muted loop className="video">
          <source src="/home-video.mp4" type="video/mp4" />
        </video>
        <img
          src="/Foto_Portada.jpg"
          alt="Portada"
          className="background-image"
        />
        <div className="overlay"></div>
        <div className="hero">
          <SocialSidebar />
        </div>
        <div className="container-form-serch align--center">
          <SearchHomeForm
            formData={formData}
            setFormData={setFormData}
            localidades={localidades}
            close={close}
            setClose={setClose}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <div className="seleccion-section">
        <div className="seleccion">
          <SocialSidebar color="red" />
          <BackToTop color="red" />
        </div>
        <div className="container seleccion--container">
          <Title
            title="NUESTRA SELECCIÓN"
            linkButton="/highlighted"
            buttonStyle="outline red"
          />
          <div className="prop-list">
            <SelectionListContainer></SelectionListContainer>
          </div>
          <Button
            className="button--mobile"
            text="Ver más"
            type="outline red"
            link="/highlighted"
          />
        </div>
      </div>
      <div className="inversion-section">
        <div className="inversion">
          <SocialSidebar color="black" />
          <BackToTop color="black" />
        </div>
        <div className="container inversion--container">
          <div className="inversion-list">
            <div className="inversion-item item--text">
              <Title
                title="TU PRÓXIMA INVERSIÓN"
                buttonStyle="outline black"
                vertical
                linkButton="/emprendimientos"
              />
            </div>
            {(Array.isArray(emprendimientos) ? emprendimientos : []).map((item, k) => (
              <div className="inversion-item" key={k}>
                <CardProp property={item} inversion />
              </div>
            ))}
          </div>
          <Button
            className="button--mobile"
            text="Ver más"
            type="outline black"
            link="/emprendimientos"
          />
        </div>
      </div>
    </div>
  );
});

export default Home;
