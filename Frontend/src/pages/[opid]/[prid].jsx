import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getProperties } from '../services';
import { parseTokkoParameters } from '../helpers/tokko';
import { Layout } from '../components/layout';
import { PropertyList } from '../components/propertylist';
import Error500 from '../pages/Error500';
import Error404 from '../pages/Error404';
import BackToTop from '../components/BackToTop';

const PropertySearch = () => {
  const { opid, prid } = useParams();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [statusCode, setStatusCode] = useState(200);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProperties({
          params: parseTokkoParameters({ ...location.query }),
        });
        setData(result);
      } catch (error) {
        setStatusCode(error.response ? error.response.status : 500);
      }
    };

    fetchData();
  }, [location.query]);

  if (statusCode === 404) return <Error404 />;
  if (statusCode >= 500) return <Error500 />;

  return (
    <Layout>
      <BackToTop color='red' />
      <PropertyList properties={data?.objects} meta={data?.meta} query={location.query} />
    </Layout>
  );
};

export default PropertySearch;
