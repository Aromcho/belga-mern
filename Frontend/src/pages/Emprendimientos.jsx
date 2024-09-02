import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout.jsx";
import { getDevelopments } from "../services";
import { BackToTop } from "../components/backtotop";
import { PropertyList } from "../components/propertylist";

const Emprendimientos = () => {
  const [developments, setDevelopments] = useState([]);

  useEffect(() => {
    const fetchDevelopments = async () => {
      const data = await getDevelopments({ params: {} });
      setDevelopments(data.objects);
    };

    fetchDevelopments();
  }, []);

  return (
    <Layout menuTheme="dark">
      <BackToTop />
      <PropertyList
        properties={developments}
        meta={developments.meta}
        saveSearch={false}
        investment={true}
        filters={false}
      />
    </Layout>
  );
};

export default Emprendimientos;
