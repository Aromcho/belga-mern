import React, { useState } from "react";
import dynamic from "next/dynamic";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MapProp, PlaceholderImage, MapIcon } from "./styles";

const DynamicMap = dynamic(() => import("../mapProp2/MapProp2"), { ssr: false });

const DevelopmentsMap = ({ property }) => {
  const [mapVisible, setMapVisible] = useState(false);

  return (
    <MapProp>
      {!mapVisible ? (
        <PlaceholderImage onClick={() => setMapVisible(true)}>
          <MapIcon>
            <FaMapMarkerAlt size={32} />
          </MapIcon>
        </PlaceholderImage>
      ) : (
        <DynamicMap
          marker={{ lon: property.geo_long, lat: property.geo_lat }}
          center={{ lon: property.geo_long, lat: property.geo_lat }}
          zoom={15}
        />
      )}
    </MapProp>
  );
};

export default DevelopmentsMap;
