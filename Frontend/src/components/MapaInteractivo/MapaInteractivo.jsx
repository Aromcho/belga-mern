import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet"; 
import "./MapaInteractivo.css";
import customIconUrl from "/images/pin.svg";

// Definir un ícono personalizado
const customIcon = new L.Icon({
  iconUrl: customIconUrl,
  iconSize: [38, 40],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const MapaInteractivo = ({ property }) => {
  // Valores predeterminados
  const defaultLat = -34.603722; // Latitud de Buenos Aires por defecto
  const defaultLng = -58.381592; // Longitud de Buenos Aires por defecto
  const defaultAddress = "Buenos Aires, Argentina";

  // Estado para latitud, longitud y dirección
  const geo_lat = property.geo_lat || defaultLat;
  const geo_long = property.geo_long || defaultLng;
  const direccion = property.address || defaultAddress;

  // Estado de la posición inicial
  const [position, setPosition] = useState({ lat: geo_lat, lng: geo_long });

  // Actualizar la posición cuando las props cambian
  useEffect(() => {
    setPosition({ lat: geo_lat, lng: geo_long });
  }, [geo_lat, geo_long]);

  return (
    <div>
      {/* Contenedor del Mapa */}
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={13}
        style={{ height: "500px", width: window.innerWidth <= 768 ? "100%" : "40vw" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a> contributors'
        />
        <Marker position={[position.lat, position.lng]} icon={customIcon}>
          <Tooltip
            permanent
            className="custom-tooltip"
            offset={[0, -40]} // Ajuste del tooltip
          >
            <h4>{direccion}</h4>
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapaInteractivo;
