import React from "react";
import { PropertyList } from "../propertylist";

const SimilarProperties = ({ properties }) => {
  return (
    <div>
      <h2>Similar Properties</h2>
      <PropertyList properties={properties} />
    </div>
  );
};

export default SimilarProperties;
