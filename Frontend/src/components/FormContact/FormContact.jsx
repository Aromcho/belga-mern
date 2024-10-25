import React, { useState } from "react";
import "./FormContact.css"; // Asegúrate de que el archivo CSS también esté correctamente referenciado
import { BelgaIsoIcon } from "../Icons/Icons.jsx";
import { TitleWithIcon } from "../TitleWithIcon/TitleWithIcon.jsx";
import { Input } from "../Input/Input.jsx";
import { Textarea } from "../Textarea/Textarea.jsx";
const FormContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      console.log("Datos del formulario enviados:", formData);
      setShowWarning(false);
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
            className="h-100"
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

      {showWarning && (
        <div className="warning-message">
          Revise los campos requeridos
        </div>
      )}
    </div>
  );
};

export default FormContact;
