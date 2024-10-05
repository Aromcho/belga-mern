import React, { useState, useEffect } from "react";
import Button from "../../Button/Button";
import { Input } from "../../Input/Input";
import { Textarea } from "../../Textarea/Textarea";
import { FeedbackMsg } from "../FeedbackMsg/FeedbackMsg";
import { TitleWithIcon } from "../../TitleWithIcon/TitleWithIcon";
import "./ContactForm.css";

const ContactForm = ({ className = "", full = false }) => {
  const [state, setState] = useState("send");
  const [display, setDisplay] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    direction: "",
    property: "",
    message: "",
    url: "",
    subject: "Contacto desde la web",
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
    setDisplay(true);
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
    setState("sending");
    sendContact(data)
      .then(() => {
        setState("sent");
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
          subject: "Contacto desde la web",
        });
      })
      .catch(() => {
        setStatus({
          status: "error",
          text: "Ha ocurrido un error, reintente en unos minutos",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setState("gone");
          setTimeout(() => {
            setState("send");
          }, 1000);
        }, 1500);
      });
  };

  if (!display) return null;

  return (
    <div className={`contact-form-container ${className} ${full ? 'full' : ''}`}>
      <div className="contact-form-wrapper ">
      <TitleWithIcon text="¿Cómo te podemos ayudar?" className="black" />

        <div className="wrapper-inputs">
          <Input
            className="input--form "
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
        type="button"
        className={`button--send ${full ? 'full' : ''}`}
        sendStatus={state}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default ContactForm;
