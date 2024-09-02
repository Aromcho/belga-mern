import React, { useEffect, useState } from "react";
import { getProperties } from "../services";
import { Layout } from "../components/layout";
import { BackToTop } from "../components/backtotop";
import { PropertyList } from "../components/propertylist";

const Destacados = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProperties({
          params: {
            filters: [["is_starred_on_web", "Yes", 0]],
            operation_types: [1],
          },
        });
        setData(result);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <BackToTop />
      <PropertyList
        properties={data?.objects}
        meta={data?.meta}
        saveSearch={false}
        filters={false}
        withCount={false}
      />
    </Layout>
  );
};

export default Destacados;
