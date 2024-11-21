import React, { useState } from "react";
import "./FormContact.css";
import { BelgaIsoIcon } from "../Icons/Icons.jsx";
import { TitleWithIcon } from "../TitleWithIcon/TitleWithIcon.jsx";
import { Input } from "../Input/Input.jsx";
import { Textarea } from "../Textarea/Textarea.jsx";
import axios from "axios";

const FormContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [showWarning, setShowWarning] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setShowWarning(false);
      try {
        // Enviar datos al backend
        const response = await axios.post("/api/contact", formData);
        if (response.data.code === 1) {
          setSuccessMessage("¡Mensaje enviado exitosamente!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        }
      } catch (error) {
        setErrorMessage("Hubo un problema al enviar el mensaje.");
        console.error("Error al enviar el formulario de contacto:", error);
      }
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="contact-form-wrapper">
      <form onSubmit={handleSubmit} className="contact-form">
        <TitleWithIcon text="¿Cómo te podemos ayudar?" className="black" />
        <Input
          type="text"
          name="name"
          placeHolder={"Nombre *"}
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeHolder={"Email *"}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="tel"
          name="phone"
          placeHolder={"Teléfono *"}
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <Textarea
          className=""
          name="message"
          value={formData.message}
          placeHolder={"Mensaje"}
          onChange={handleChange}
          required
        />
        <div className="btn-form-footer-cont">        
          <button className="btn-form-footer" type="submit">ENVIAR</button>
        </div>
      </form>

      {showWarning && <div className="warning-message">Revise los campos requeridos</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default FormContact;
