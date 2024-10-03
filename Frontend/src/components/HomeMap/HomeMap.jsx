import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { Navbar, Nav } from "react-bootstrap";
import { useSpring, animated } from "react-spring";
import { Container } from "react-bootstrap";
import customIconUrl from "/images/pin.svg";
import "./HomeMap.css";

// Definir un ícono personalizado
const customIcon = new L.Icon({
  iconUrl: customIconUrl,
  iconSize: [38, 40],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const data = [
  {
    id: 1,
    name: "Casa Central LA IMPRENTA",
    direction: "Gorostiaga 1601",
    direction_b: "(Esquina Migueletes)",
    loc: { lon: -58.4364415, lat: -34.5652519, zoom: 14.5 },
  },
  {
    id: 2,
    name: "BELGRANO C",
    direction: "Juramento 2102",
    direction_b: "1426 CABA",
    loc: { lat: -34.56051641836724, lon: -58.45384234503877, zoom: 14.5 },
  },
  {
    id: 3,
    name: "BELGRANO R",
    direction: "Superí 1485",
    direction_b: "(Esquina Av. de los Incas)",
    loc: { lat: -34.5735786974359, lon: -58.46109912564103, zoom: 14.5 },
  },
];

const HomeMap = () => {
  const [activeLocation, setActiveLocation] = useState(0);

  const { loc, name, direction, direction_b } = data[activeLocation];
  const { lat, lon, zoom } = loc;

  // Animación suave de entrada para el mapa
  const slideIn = useSpring({
    from: { opacity: 0, transform: "translateX(100%)" },
    to: { opacity: 1, transform: "translateX(0%)" },
    reset: true,
    config: { duration: 500 },
  });

  return (
    <div className="map-section">
      <h2 className="title-text home-map-title m-3">Visítanos en:</h2>

      <Navbar bg="transparent" expand="lg" className="map-navbar">
        <Container>
          <Nav className="me-auto w-100 d-flex justify-content-around">
            {data.map((location, index) => (
              <Nav.Link
                key={location.id}
                className={`nav-link ${
                  activeLocation === index ? "active" : ""
                }`}
                onClick={() => setActiveLocation(index)}
              >
                {location.name}
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>

      <Container className="home-map-container">
        {/* Mapa animado */}
        <animated.div style={slideIn} className="map-slide">
          {/* Se recrea el mapa completamente al cambiar de ubicación */}
          <MapContainer
            key={activeLocation} // Se usa la key para forzar la recreación del mapa
            center={[lat, lon]}
            zoom={zoom}
            style={{ height: "400px" }}
            className="leaflet-map"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a> contributors'
            />
            <Marker position={[lat, lon]} icon={customIcon}>
              <Tooltip permanent className="custom-tooltip" offset={[0, -50]}>
                <h4>{name}</h4>
                <p>{direction}</p>
              </Tooltip>
            </Marker>
          </MapContainer>
        </animated.div>

        <animated.div style={slideIn} className="map-info mt-3">
          <h4>{name}</h4>
          <p>{direction}</p>
          <p>{direction_b}</p>
        </animated.div>
      </Container>
    </div>
  );
};

export default HomeMap;
