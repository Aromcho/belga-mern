import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getDevelopmentById, getDevelopmentProperties, getProperties } from "../services";
import Layout from "../components/Layout";
import BackToTop from "../components/BackToTop";
import SocialSidebar from "../components/SocialSidebar";
import Error500 from "../pages/500";
import Error404 from "../pages/404";
import DevelopmentsDetail from "../components/DevelopmentsDetail/DevelopmentsDetail";

const Emprendimientos = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [propertySubs, setPropertySubs] = useState([]);
  const [statusCode, setStatusCode] = useState(200);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyData = await getDevelopmentById(parseInt(id));
        setProperty(propertyData);

        const propertySubsData = await getDevelopmentProperties(propertyData.id);
        setPropertySubs(propertySubsData.objects);

        const { objects } = await getProperties({
          params: {
            filters: [["is_starred_on_web", "=", true]],
            operation_types: [1],
          },
        });
        setProperties(objects);
      } catch (error) {
        setStatusCode(error.response ? error.response.status : 500);
      }
    };

    fetchData();
  }, [id]);

  if (statusCode === 404) return <Error404 />;
  if (statusCode >= 500) return <Error500 />;

  return (
    <Layout menuTheme="dark">
      <BackToTop color="black" />
      <SocialSidebar color="black" showWithOffset />
      <DevelopmentsDetail
        property={property}
        properties={properties}
        propertySubs={propertySubs}
      />
    </Layout>
  );
};

export default Emprendimientos;
