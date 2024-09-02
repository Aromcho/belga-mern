import React from "react";

const PropertyFeatures = ({ property }) => {
  return (
    <div>
      <h2>Features</h2>
      <ul>
        {/* List of features */}
        {property?.bathroom_amount && <li>Bathrooms: {property.bathroom_amount}</li>}
        {/* Add more features as needed */}
      </ul>
    </div>
  );
};

export default PropertyFeatures;
