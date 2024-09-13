import React, { useState } from "react";
import "./FormContact.css"; // Asegúrate de que el archivo CSS también esté correctamente referenciado

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
        <h2 className="form-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            {/* SVG content */}
          </svg>
          ¿Cómo te podemos ayudar?
        </h2>

        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Correo Electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Teléfono:
          <input
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

        <button type="submit">Enviar</button>
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
