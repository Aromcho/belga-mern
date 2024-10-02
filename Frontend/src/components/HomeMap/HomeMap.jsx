import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./HomeMap.css";
import customIconUrl from "/images/pin.svg"; // Cambia esta ruta si tienes un ícono diferente

// Definir un ícono personalizado
const customIcon = new L.Icon({
  iconUrl: customIconUrl,
  iconSize: [38, 40],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const HomeMap = ({ geo_lat, geo_long, address }) => {
  // Valores predeterminados para Buenos Aires
  const defaultLat = -34.564221; // Latitud de Buenos Aires
  const defaultLng = -58.46208; // Longitud de Buenos Aires
  const defaultAddress = "Buenos Aires, Argentina";

  // Usamos las coordenadas recibidas o las predeterminadas
  const lat = defaultLat;
  const lng = defaultLng;
  const displayAddress = defaultAddress;

  return (
    <div className="home-map-container">
      <MapContainer center={[lat, lng]} zoom={13} style={{ height: "400px", width: "400px" }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a> contributors'
        />
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>
            <h2>{displayAddress}</h2>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default HomeMap;
