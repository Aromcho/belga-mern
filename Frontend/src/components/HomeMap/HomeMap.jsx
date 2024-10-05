import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import L from "leaflet";
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

// Datos de las ubicaciones
const data = [
  {
    id: 1,
    name: "Casa Central LA IMPRENTA",
    direction: "Gorostiaga 1601",
    direction_b: "(Esquina Migueletes)",
    loc: { lat: -34.5652519, lon: -58.4364415 },
  },
  {
    id: 2,
    name: "BELGRANO C",
    direction: "Juramento 2102",
    direction_b: "1426 CABA",
    loc: { lat: -34.56051641836724, lon: -58.45384234503877 },
  },
  {
    id: 3,
    name: "BELGRANO R",
    direction: "Superí 1485",
    direction_b: "(Esquina Av. de los Incas)",
    loc: { lat: -34.5735786974359, lon: -58.46109912564103 },
  },
];

const HomeMap = () => {
  // Centro inicial del mapa (promedio de todas las ubicaciones)
  const mapCenter = [-34.565, -58.445];
  const zoomLevel = 14;

  return (
    <div className="map-section">
      <Container className="home-map-container">
        {/* Mapa con múltiples pines */}
        <MapContainer center={mapCenter} zoom={zoomLevel} style={{ height: "100vh"
 }} className="leaflet-map">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a> contributors'
          />
          
          {/* Mostrar múltiples marcadores */}
          {data.map((location) => (
            <Marker key={location.id} position={[location.loc.lat, location.loc.lon]} icon={customIcon}>
              <Popup permanent className="custom-tooltip" offset={[0, 0]}>
                <h4>{location.name}</h4>
                
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Container>
    </div>
  );
};

export default HomeMap;
