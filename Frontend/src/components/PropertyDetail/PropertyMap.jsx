import React, { useState } from "react";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../mapProp2/mapProp2"), { ssr: false });

const PropertyMap = ({ property }) => {
  const [mapVisible, setMapVisible] = useState(false);

  return (
    <div>
      {!mapVisible && <button onClick={() => setMapVisible(true)}>Show Map</button>}
      {mapVisible && <DynamicMap center={{ lon: property.geo_long, lat: property.geo_lat }} />}
    </div>
  );
};

export default PropertyMap;
