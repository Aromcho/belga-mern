import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import axios from "axios";
import './propertyList.css';

import CardProp from "../CardProp/CardProp";
import { ArrowBackIcon, CloseIcon } from "../Icons/Icons";
import ContactForm from "../Forms/ContactForm/ContactForm.jsx";
import { classes } from "../../helpers/index";



// Componentes dinámicos

const PropertyList = observer(
  ({
    query,
    meta,
    properties,
    filters = true,
    saveSearch = true,
    investment = false,
    back = true,
    withForm = true,
    withCount = true,
    paddingTop,
  }) => {
    const { rootStore: { userStore } } = UserStore();
    const [formData, setFormData] = useMergeState({
      locations: [],
      min_rooms: "",
      max_rooms: "",
      min_baths: "",
      max_baths: "",
      operation_type: [1],
      property_type: -1,
      price_from: 0,
      price_to: 0,
      parking_lot_to: "",
      parking_lot_from: "",
      order: "DESC",
    });

    const [close, setClose] = useMergeState({
      rooms: undefined,
      baths: undefined,
      parking: undefined,
    });

    const [showFilter, setShowFilter] = useState(false);
    const [barrios, setBarrios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      if (query?.opid) {
        setFormData({
          operation_type: operationTypes[query.opid]
            .toString()
            ?.split(",")
            .map((item) => parseInt(item)),
        });
      }
      if (query?.prid && query?.prid !== "todos") {
        setFormData({ property_type: propertyTypes[query.prid] });
      }
      if (query?.locid) {
        setFormData({
          locations: barrios
            .filter((item) =>
              query.locid.includes(item.label.toLowerCase())
            )
            .map((item) => item.value),
        });
      }
      if (query?.rooms_from) setFormData({ min_rooms: query.rooms_from });
      if (query?.rooms_to) setFormData({ max_rooms: query.rooms_to });
      if (query?.order) setFormData({ order: query.order });
      if (query?.price_from) setFormData({ price_from: query.price_from });
      if (query?.price_to) setFormData({ price_to: query.price_to });
      if (query?.baths_from) setFormData({ min_baths: query.baths_from });
      if (query?.baths_to) setFormData({ max_baths: query.baths_to });
      if (query?.parking_lot_from) setFormData({ parking_lot_from: query.parking_lot_from });
      if (query?.parking_lot_to) setFormData({ parking_lot_to: query.parking_lot_to });
    }, [query, barrios, setFormData]);

    useEffect(() => {
      axios('/api/neighborhoods')
        .then(({ data }) => setBarrios(data))
        .catch((error) => console.error("Error loading neighborhoods:", error));
    }, []);

    const localidades = barrios.map((item) => ({
      value: item.location_id,
      label: item.location_name,
    }));

    const handleOrderChange = (order) => {
      setFormData({ order });
      setTimeout(() => {
        navigate(getSearchUrl({ ...formData, order }));
      }, 100);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setShowFilter(false);
      navigate(getSearchUrl(formData));
    };

    const currentPage = Math.floor(meta?.offset / meta?.limit) + 1;
    const maxPage = Math.ceil(meta?.total_count / meta?.limit);

    return (
      <div className="property-list-wrapper" style={paddingTop ? { paddingTop: `${paddingTop}px` } : {}}>
        {/* Aquí puedes agregar tu componente de barra lateral de redes sociales */}
        {filters && (
          <>
            {meta?.total_count !== 0 && (
              <Button
                className="filter--button"
                type="secondary shine"
                text="FILTRAR"
                onClick={() => setShowFilter(true)}
              />
            )}

            <div className={classes("filters-container", { visible: showFilter })}>
              {meta?.total_count !== 0 && (
                <div className="filters-header">
                  <div className="icon-close-wrapper" onClick={() => { handleSubmit(); setShowFilter(false); }}>
                    <CloseIcon />
                  </div>
                </div>
              )}

              <div className="filters-wrapper-desk">
                <Select
                  className="input--general select"
                  options={[
                    { value: 1, label: "Venta" },
                    { value: 2, label: "Alquiler" },
                  ]}
                  isSearchable={false}
                  isMulti
                  value={operationArray.filter((item) => formData.operation_type.includes(item.value))}
                  placeholder="Tipo de Operación"
                  onChange={(opt) => setFormData({ operation_type: opt.map((item) => item.value) })}
                />
                {/* Agregar el resto de los campos de filtro de la misma manera */}
              </div>

              <div className="filters-wrapper-mobile">
                {/* Campos de filtros móviles */}
                <Button
                  className="filter--button btn-mobile"
                  type="secondary shine"
                  text="Aplicar filtros"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </>
        )}

        <Container>
          <div className="top-container">
            <div className="content-wrapper">
              {back && (
                <div className="row-content bold">
                  <Link to="/">
                    <ArrowBackIcon className="left" /> VOLVER AL INICIO
                  </Link>
                </div>
              )}
              {withCount && (
                <div className="row-content count">
                  {`${meta?.total_count} ${meta?.total_count > 1 ? "Resultados" : "Resultado"}`}
                </div>
              )}
            </div>
            <div className="content-wrapper content--order">
              {/* Componente de guardado de búsqueda y ordenamiento */}
            </div>
          </div>

          <div className={classes("list-container", { "investment-list": investment })}>
            {properties?.map((item, k) => (
              <CardProp
                key={k}
                property={item}
                className="card--prop-home"
                liked={userStore.favorites.includes(item.id)}
                onLiked={() => userStore.toggleFavorite(item.id)}
                inversion={investment}
              />
            ))}
          </div>

          {meta?.total_count > meta?.limit && (
            <div className="pagination-wrapper">
              {currentPage > 1 && (
                <Link to={{ pathname: "/propertylist", search: `?page=${currentPage - 1}` }}>
                  <a className="pagination-number">{currentPage - 1}</a>
                </Link>
              )}
              <a className="pagination-number active">{currentPage}</a>
              {maxPage >= currentPage + 1 && (
                <Link to={{ pathname: "/propertylist", search: `?page=${currentPage + 1}` }}>
                  <a className="pagination-number">{currentPage + 1}</a>
                </Link>
              )}
            </div>
          )}

          {withForm && <ContactForm full />}
        </Container>
      </div>
    );
  }
);

export default PropertyList;
