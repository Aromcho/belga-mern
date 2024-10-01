import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout.jsx";
import { ArrowBackIcon } from "../../components/Icons/Icons.jsx";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useSpring, animated } from "react-spring";
import { Container } from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";
import Confetti from "react-confetti";
import "./QuieroVender.css";

const steps = [
  {
    label: "Nombre",
    message: "¡Vamos a conocerte! ¿Cuál es tu nombre?",
    icon: <FaUser />,
  },
  {
    label: "Email",
    message:
      "Queremos enviarte la información completa. ¿Cuál es tu correo?",
    icon: <FaEnvelope />,
  },
  {
    label: "Teléfono",
    message:
      "Por si necesitamos contactarte más rápido, danos tu número.",
    icon: <FaPhoneAlt />,
  },
  {
    label: "Dirección",
    message:
      "¿Dónde está ubicada la propiedad que quieres vender?",
    icon: <FaMapMarkerAlt />,
  },
  {
    label: "Tipo de Propiedad",
    message:
      "¿Qué tipo de propiedad es? (Casa, apartamento, etc.)",
    icon: <FaBuilding />,
  },
];

const QuieroVender = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    tipoPropiedad: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Aquí puedes agregar la lógica para enviar el formulario
  };

  // Animación de entrada suave para el formulario
  const slideIn = useSpring({
    from: { opacity: 0, transform: "translateX(100%)" },
    to: { opacity: 1, transform: "translateX(0%)" },
    reset: true,
  });

  // Mensaje de éxito
  const celebrationMessage =
    "¡Felicidades! Ya casi sabemos cuánto vale tu propiedad. Te contactaremos pronto con todos los detalles.";

  // Si ya se ha enviado el formulario, mostramos la animación y el confeti
  if (isSubmitted) {
    return (
      <div className="celebration-container">
        <Confetti />
        <Typography variant="h4" className="celebration-text">
          {celebrationMessage}
        </Typography>
        <Link to="/" className="go-back-link">
          <Button variant="outlined" className="btn-back">
            Volver al inicio
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Layout>
      <div className="quiero-vender-container">
        <div className="back-wrapper">
          <Link to="/" className="back-link">
            <ArrowBackIcon />
            Volver al inicio
          </Link>
        </div>

        <Container className="stepper-container">
          <Stepper activeStep={activeStep} alternativeLabel className="custom-stepper">
            {steps.map((step, index) => (
              <Step
                key={index}
                className={`step-item ${
                  activeStep === index ? "active-step-item" : ""
                }`}
              >
                <StepLabel
                  icon={
                    <animated.div className="step-icon">
                      {step.icon}
                    </animated.div>
                  }
                  className="step-label"
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <animated.div style={slideIn}>
            <Typography variant="h6" className="step-message">
              {steps[activeStep].message}
            </Typography>
            <div className="form-step-content">
              {activeStep === 0 && (
                <TextField
                  label="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  fullWidth
                  className="custom-input"
                />
              )}
              {activeStep === 1 && (
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  className="custom-input"
                />
              )}
              {activeStep === 2 && (
                <TextField
                  label="Teléfono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  fullWidth
                  className="custom-input"
                />
              )}
              {activeStep === 3 && (
                <TextField
                  label="Dirección"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  fullWidth
                  className="custom-input"
                />
              )}
              {activeStep === 4 && (
                <TextField
                  label="Tipo de Propiedad"
                  name="tipoPropiedad"
                  value={formData.tipoPropiedad}
                  onChange={handleChange}
                  fullWidth
                  className="custom-input"
                />
              )}
            </div>
          </animated.div>

          <div className="stepper-buttons">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className="btn-back-step"
            >
              Atrás
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                className="btn-submit"
                onClick={handleSubmit}
              >
                Enviar
              </Button>
            ) : (
              <Button
                variant="contained"
                className="btn-next-step"
                onClick={handleNext}
              >
                Siguiente
              </Button>
            )}
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default QuieroVender;
