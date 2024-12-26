import React, { useState, useEffect } from "react";
import "../VenderForm/VenderForm.css";
import { TitleWithIcon } from "../../TitleWithIcon/TitleWithIcon.jsx";
import { Input } from "../../Input/Input.jsx";
import { Textarea } from "../../Textarea/Textarea.jsx";
import Button from "../../Button/Button.jsx";
import FeedbackMsg from "../FeedbackMsg/FeedbackMsg.jsx";
import axios from "axios";

const FormList = ({ className = "" }) => {
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
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
    
      const sendContact = async (contactData) => {
        try {
          const response = await axios.post('/api/contact', contactData);
          return response.data;
        } catch (error) {
          console.error("Error al enviar contacto:", error);
          throw error;
        }
      };
    
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
              message: "",
              url: window.location.href,
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
        <TitleWithIcon text="¿Cómo te podemos ayudar?" className="black mb-0 pt-5" />
          <div className="form-wrapper">
            <div className="wrapper-inputs">
              <Input
                className="input-list"
                placeHolder="Nombre *"
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.currentTarget.value })}
                error={error.name}
                onBlur={(e) => setError({ ...error, name: e.currentTarget.value === "" })}
              />
    
              <Input
                className="input-list"
                placeHolder="Email *"
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.currentTarget.value })}
                error={error.email}
                onBlur={(e) => setError({ ...error, email: e.currentTarget.value === "" })}
              />
    
              <Input
                className="input-list"
                placeHolder="Teléfono *"
                type="tel"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.currentTarget.value })}
                error={error.phone}
                onBlur={(e) => setError({ ...error, phone: e.currentTarget.value === "" })}
              />
            </div>
    
            
    
            <Textarea
              className="textarea--form"
              placeHolder="Mensaje"
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
            className="button--send mt-0"
            onClick={handleSubmit}
          />
        </div>
      );
    };
    
    export default FormList;