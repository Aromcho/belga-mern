import React from "react";
import { getProperties, getPropertyById } from "../../services";
import Property from "../../components/print/Property";

const Index = ({ property }) => {
  return <Property property={property} />;
};

export const getServerSideProps = async ({ query }) => {
  let props = {};

  try {
    const property = await getPropertyById(parseInt(query.id, 10));

    // Obtener solo propiedades destacadas y ventas
    const { objects } = await getProperties({
      params: {
        filters: [["is_starred_on_web", "=", true]],
        operation_types: [1],
        limit: 2,
      },
    });

    props = {
      property,
      properties: objects,
    };
  } catch (e) {
    props = {
      statusCode: e.response ? e.response.status : 500,
    };
  }

  return {
    props,
  };
};

export default Index;
