import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ItemSelectedList from '../ItemSelectedList/ItemSelectedList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../ItemListContainer/ItemListContainer.css';

const ItemListSelectedContainer = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/property/properties', {
          params: {
            is_starred: true,
          },
        });
        setProperties(response.data.objects);
        console.log('Properties fetched:', response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <Container className="item-list-container">
      <ItemSelectedList properties={properties} onPropertyClick={handlePropertyClick} />
    </Container>
  );
};

export default ItemListSelectedContainer;
