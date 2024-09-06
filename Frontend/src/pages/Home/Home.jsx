import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "../../components/Dropdown/Dropdown.jsx";
import { Input } from "../../components/Input/Input.jsx";
import { MultiRange } from "../../components/MultiRange/MultiRange.jsx";
import Button from "../../components/Button/Button.jsx";
import CardProp from "../../components/CardProp/CardProp.jsx";
import Title from "../../components/Title/Title.jsx";
import BackToTop from "../../components/BackToTop/BackToTop.jsx";

import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import UserStore from "../../store/UserStore.jsx";
import { formatToMoney, getDropdownValue } from "../../helpers/index.js";
import { useMergeState } from "../../helpers/hooks";
import { getSearchUrl, propertiesSelectOptions } from "../../helpers/tokko.js";
import SocialSidebar from "../../components/SocialSidebar/SocialSidebar.jsx"; 
import Select from "../../components/Select/Select.jsx";
import SelectionListContainer from "../../components/SelectionListContainer/SelectionListContainer.jsx";

import "./Home.css"; 
import Item from "../../components/Item/Item.jsx";

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
        // Asegurarse de que `data` sea un array
        setProperties(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('Error fetching properties:', err);
        setProperties([]); // Asegurarse de que `properties` sea un array vacío en caso de error
      });

    // Obtener emprendimientos
    axios('/api/properties')
      .then(({ data }) => {
        setEmprendimientos(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('Error fetching emprendimientos:', err);
        setEmprendimientos([]); // Asegurarse de que `emprendimientos` sea un array vacío en caso de error
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
          <div className="search-form-wrapper">
            <div className="search-row first--row">
              <Select
                className="white first--row-input input--general"
                options={[
                  { value: 1, label: "Venta" },
                  { value: 2, label: "Alquiler" },
                ]}
                isSearchable={false}
                isMulti={true}
                placeholder="Tipo de Operación"
                onChange={(opt) => {
                  setFormData({
                    operation_type: opt.map((item) => item.value),
                  });
                }}
                fixes={true}
              />
              <Select
                className="white first--row-input input--general"
                options={propertiesSelectOptions}
                isSearchable={false}
                placeholder="Tipo de Propiedad"
                onChange={(opt) => {
                  setFormData({ property_type: opt.value });
                }}
                fixes={true}
              />
              <Dropdown
                className="white first--row-input"
                placeholder="Dormitorios"
                close={close.rooms}
                value={getDropdownValue(
                  formData?.min_rooms,
                  formData?.max_rooms,
                  "Dorms."
                )}
              >
                <div className="dropdown-row">
                  <span className="row-label">Min.</span>
                  <Input
                    className="input--general"
                    type="number"
                    placeHolder="-"
                    min={0}
                    value={formData?.min_rooms}
                    onChange={(e) => {
                      setFormData({ min_rooms: e?.currentTarget?.value });
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        setFormData({ min_rooms: e?.currentTarget?.value });
                        setClose({ rooms: !close.rooms });
                      }
                    }}
                  />
                </div>
                <div className="dropdown-row">
                  <span className="row-label">Max.</span>
                  <Input
                    className="input--general"
                    type="number"
                    placeHolder="-"
                    min={formData?.min_rooms}
                    value={formData?.max_rooms}
                    onChange={(e) => {
                      setFormData({ max_rooms: e?.currentTarget?.value });
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        setFormData({ max_rooms: e?.currentTarget?.value });
                        setClose({ rooms: !close.rooms });
                      }
                    }}
                  />
                </div>
              </Dropdown>
            </div>
            <div className="search-row second--row">
              <Select
                options={localidades}
                isMulti={true}
                placeholder="Barrios"
                hideSelectedOptions={true}
                styles={{
                  container: (provided, state) => ({
                    ...provided,
                    marginBottom: 15,
                  }),
                }}
                onChange={(opt) => {
                  setFormData({
                    locations: opt.map((item) => item.value),
                  });
                }}
              />
            </div>
            <div className="search-row third--row">
              <div className="range-wrapper">
                <span className="price-text">Precio</span>
                <div className="price-range range--home">
                  <MultiRange
                    customWidth={336}
                    min={0}
                    max={3000000}
                    step={20000}
                    onChange={({ minVal, maxVal }) => {
                      setFormData({ price_from: minVal, price_to: maxVal });
                    }}
                  />
                  <div className="price-input-wrapper">
                    <Input
                      className="input--price bottomLine"
                      type="text"
                      maxLength={15}
                      value={formatToMoney(
                        formData.price_from.toString(),
                        true,
                        "USD",
                        false
                      )}
                      onChange={() => {}}
                    />
                    <div className="input-divider" />
                    <Input
                      className="input--price bottomLine"
                      type="text"
                      maxLength={15}
                      value={
                        formData.price_to >= 3000000
                          ? formatToMoney(
                              formData.price_to.toString(),
                              true,
                              "USD +",
                              false
                            )
                          : formatToMoney(
                              formData.price_to.toString(),
                              true,
                              "USD",
                              false
                            )
                      }
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>
              <Button
                className="third--row-button"
                text="Buscar"
                type="secondary shine"
                onClick={handleSubmit}
              />
            </div>
            <div className="search-row fourth--row">
              <Button
                className="fourth--row-button"
                text="Quiero vender"
                link="/quiero-vender"
              />
            </div>
          </div>
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
