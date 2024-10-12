import React, { useState, useEffect } from "react";
import Button from "../../Button/Button.jsx";
import { Input } from "../../Input/Input.jsx";
import {Textarea} from "../../Textarea/Textarea.jsx";
import FeedbackMsg from "../FeedbackMsg/FeedbackMsg.jsx";
import { propertiesSelectOptions } from "../../../helpers/tokko.js";
import Select from 'react-select';  // Importar react-select
import "./VenderForm.css";

export const VenderForm = ({ className = "" }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    direction: "",
    property: "",
    message: "",
    url: "",
    subject: "Quiero vender",
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const [status, setStatus] = useState({
    status: "",
    text: "",
  });

  useEffect(() => {
    setData({ ...data, url: window.location.href });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({
      name: data.name === "",
      email: data.email === "",
      phone: data.phone === "",
    });
    if (data.name === "" || data.email === "" || data.phone === "") {
      setStatus({
        status: "error",
        text: "Revise los campos requeridos",
      });
      return;
    }
    sendContact(data)
      .then(() => {
        setStatus({
          status: "success",
          text: "Tu contacto ha sido enviado",
        });
        setData({
          name: "",
          email: "",
          phone: "",
          direction: "",
          property: "",
          message: "",
          url: "",
          subject: "Quiero vender",
        });
      })
      .catch(() => {
        setStatus({
          status: "error",
          text: "Ha ocurrido un error, reintente en unos minutos",
        });
      });
  };

  return (
    <div className={`form-container ${className}`}>
      <div className="title-form">ESTÁS A UN PASO DE SABER EL VALOR DE TU PROPIEDAD.</div>
      <div className="form-wrapper">
        <div className="wrapper-inputs">
          <Input
            className="input--form"
            placeholder="Nombre *"
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.currentTarget.value })}
            error={error.name}
            onBlur={(e) => setError({ ...error, name: e.currentTarget.value === "" })}
          />

          <Input
            className="input--form"
            placeholder="Email *"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.currentTarget.value })}
            error={error.email}
            onBlur={(e) => setError({ ...error, email: e.currentTarget.value === "" })}
          />

          <Input
            className="input--form"
            placeholder="Teléfono *"
            type="tel"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.currentTarget.value })}
            error={error.phone}
            onBlur={(e) => setError({ ...error, phone: e.currentTarget.value === "" })}
          />
        </div>

        <div className="wrapper-inputs">
          <Input
            className="input--form half"
            placeholder="Dirección"
            type="text"
            value={data.direction}
            onChange={(e) => setData({ ...data, direction: e.currentTarget.value })}
          />

          <Select
            className="input--form"
            options={propertiesSelectOptions}
            isSearchable={false}
            placeholder="Tipo de Propiedad"
            onChange={(opt) => setData({ ...data, property: opt.label })}
          />
        </div>

        <Textarea
          className="textarea--form"
          placeholder="Mensaje"
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.currentTarget.value })}
        />

        {status.status && (
          <FeedbackMsg className={status.status} msg={status.text} />
        )}
      </div>
      <Button
        text="Enviar"
        type="button"
        className="button--send"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default VenderForm;
