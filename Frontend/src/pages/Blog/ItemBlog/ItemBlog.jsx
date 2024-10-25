import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Calendar } from 'react-bootstrap-icons';
import Skeleton from '@mui/material/Skeleton'; // Importar Skeleton de Material-UI

import './ItemBlog.css';

const ItemBlog = ({ id, title, date, imageUrl, subtitle, isLoading }) => {
  return (
    <Card className="mb-4 custom-card">
      <Link to={`/blog/${id}`} className="item-link-blog">
        <div className="image-overlay-container">
          {isLoading ? (
            <Skeleton variant="rectangular" height={200} className="custom-card-img" />
          ) : (
            <Card.Img variant="top" src={imageUrl} className="custom-card-img" />
          )}
          <div className="image-overlay"></div>
          <div className="text-overlay">
            <h2 className="title">
              {isLoading ? <Skeleton width={150} height={30} /> : title}
            </h2>
          </div>
        </div>
        <Card.Body className="custom-card-body">
          <div className="d-flex justify-content-between custom-body-blog h-100">
            <p className="subtitle-card-blog">
              {isLoading ? <Skeleton width="100%" height={40} /> : subtitle}
            </p>
            <p className="date-card text-dark">
              <Calendar /> {isLoading ? <Skeleton width={80} /> : date}
            </p>
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ItemBlog;