import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Calendar } from 'react-bootstrap-icons';
import Skeleton from '@mui/material/Skeleton'; // Importar Skeleton de Material-UI
import './ItemBlog.css';

const ItemBlog = ({ id, title, date, imageUrl, subtitle, isLoading }) => {
  if (isLoading) {
    // Mostrar el Skeleton cuando isLoading es true
    return (
      <Card className="mb-4 custom-card">
        <Skeleton variant="rectangular" width="100%" height={200} className="mb-3" />
        <Card.Body className="custom-card-body">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="40%" className="mt-2" />
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4 custom-card">
      <Link to={`/blog/${id}`} className="item-link-blog">
        <div className="image-overlay-container">
          <Card.Img variant="top" src={imageUrl} className="custom-card-img" />
          <div className="image-overlay"></div>
          <div className="text-overlay">
            <h2 className="title">{title}</h2>
          </div>
        </div>
        <Card.Body className="custom-card-body">
          <div className="d-flex justify-content-between custom-body-blog h-100">
            <p className='subtitle-card-blog'>{subtitle}</p>
            <p className="date-card text-dark gap-2 mt-1">
              <Calendar />
              {date}
            </p>
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ItemBlog;
