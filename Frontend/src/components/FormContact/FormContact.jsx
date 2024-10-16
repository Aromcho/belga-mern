import React, { useState } from "react";
import "./FormContact.css"; // Asegúrate de que el archivo CSS también esté correctamente referenciado
import { BelgaIsoIcon } from "../Icons/Icons.jsx";
import { TitleWithIcon } from "../TitleWithIcon/TitleWithIcon.jsx";
import { Input } from "../Input/Input.jsx";
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


        <label>
          Nombre:
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Correo Electrónico:
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Teléfono:
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mensaje:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <button  type="submit">Enviar</button>
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
