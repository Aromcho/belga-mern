import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProperties } from "../services";
import { Layout } from "../components/layout";
import { parseTokkoParameters, operationTypes } from "../helpers/tokko";
import { BackToTop } from "../components/backtotop";
import { PropertyList } from "../components/propertylist";
import Error500 from "../pages/500";
import Error404 from "../pages/404";

const PropertySearch = () => {
  const { opid } = useParams();
  const [data, setData] = useState(null);
  const [query, setQuery] = useState({});
  const [statusCode, setStatusCode] = useState(200);

  useEffect(() => {
    const fetchData = async () => {
      const op = operationTypes[opid];
      if (op) {
        try {
          const result = await getProperties({
            params: parseTokkoParameters(query),
          });
          setData(result);
          setQuery(query);
        } catch (error) {
          setStatusCode(error.response ? error.response.status : 500);
        }
      } else {
        setStatusCode(404);
      }
    };

    fetchData();
  }, [opid, query]);

  if (statusCode === 404) return <Error404 />;
  if (statusCode >= 500) return <Error500 />;

  return (
    <Layout menuTheme="light">
      <BackToTop />
      <PropertyList properties={data?.objects} meta={data?.meta} query={query} />
    </Layout>
  );
};

export default PropertySearch;
