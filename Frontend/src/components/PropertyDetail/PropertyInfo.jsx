import React from "react";
import { formatToMoney } from "../../helpers";

const PropertyInfo = ({ property }) => {
  return (
    <div>
      <h1>{property.address}</h1>
      <p>{`${property.operations[0]?.operation_type} ${
        property?.operations[0]?.prices[0]?.currency
      } ${formatToMoney(property?.operations[0]?.prices[0]?.price)}`}</p>
      {/* Additional info like sharing options */}
    </div>
  );
};

export default PropertyInfo;
