import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "../../components/Icons/Icons.jsx";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { useSpring, animated } from "react-spring";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";
import Confetti from "react-confetti";
import "./QuieroVender.css";
import VenderForm from "../../components/Forms/VenderForm/VenderForm.jsx"
import { FaArrowLeft } from "react-icons/fa";

const steps = [
  {
    label: "Nombre",
    message: "¡Vamos a conocerte! ¿Cuál es tu nombre?",
    icon: <FaUser />,
  },
  {
    label: "Email",
    message: "Queremos enviarte la información completa. ¿Cuál es tu correo?",
    icon: <FaEnvelope />,
  },
  {
    label: "Teléfono",
    message: "Por si necesitamos contactarte más rápido, danos tu número.",
    icon: <FaPhoneAlt />,
  },
  {
    label: "Dirección",
    message: "¿Dónde está ubicada la propiedad que quieres vender?",
    icon: <FaMapMarkerAlt />,
  },
  {
    label: "Tipo de Propiedad",
    message: "¿Qué tipo de propiedad es? (Casa, apartamento, etc.)",
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

  if (isSubmitted) {
    return (
      <div className="celebration-container">
        <Confetti />
        <Typography variant="h4" className="celebration-text">
          {celebrationMessage}
        </Typography>

          <Button variant="outline-dark" as={Link} to="/" className="btn-back-step pt-2 pb-1">
            <p >Volver al inicio</p>
          </Button>
      </div>
    );
  }

  return (
    <div className="quiero-vender-container">
      <button  variant="primary" className=" btn-go-back custom-button m-5 mb-0">
        
        <p className="volver"><FaArrowLeft className="me-2" />VOLVER AL INICIO</p>
      </button>
    <VenderForm className="mt-5 pt-5"/>
    {/*
      <div className="quiero-vender-container">
        <Container>
          <div className="back-wrapper mb-4">
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

            <animated.div style={slideIn} className="animated-form-step mt-4">
              <Typography variant="h6" className="step-message mb-4">
                {steps[activeStep].message}
              </Typography>
              <Form>
                <Row>
                  <Col>
                    {activeStep === 0 && (
                      <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          className="custom-input"
                        />
                      </Form.Group>
                    )}
                    {activeStep === 1 && (
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="custom-input"
                        />
                      </Form.Group>
                    )}
                    {activeStep === 2 && (
                      <Form.Group>
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                          type="text"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          className="custom-input"
                        />
                      </Form.Group>
                    )}
                    {activeStep === 3 && (
                      <Form.Group>
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                          type="text"
                          name="direccion"
                          value={formData.direccion}
                          onChange={handleChange}
                          className="custom-input"
                        />
                      </Form.Group>
                    )}
                    {activeStep === 4 && (
                      <Form.Group>
                        <Form.Label>Tipo de Propiedad</Form.Label>
                        <Form.Control
                          type="text"
                          name="tipoPropiedad"
                          value={formData.tipoPropiedad}
                          onChange={handleChange}
                          className="custom-input"
                        />
                      </Form.Group>
                    )}
                  </Col>
                </Row>
              </Form>
            </animated.div>

            <div className="stepper-buttons mt-4">
              <Button
                variant="outline-dark"
                disabled={activeStep === 0}
                onClick={handleBack}
                className="btn-back-step"
              >
                Atrás
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="dark"
                  className="btn-submit"
                  onClick={handleSubmit}
                >
                  Enviar
                </Button>
              ) : (
                <Button
                  variant="dark"
                  className="btn-next-step"
                  onClick={handleNext}
                >
                  Siguiente
                </Button>
              )}
            </div>
          </Container>
        </Container>
      </div>*/}
    </div>
  );
};

export default QuieroVender;
