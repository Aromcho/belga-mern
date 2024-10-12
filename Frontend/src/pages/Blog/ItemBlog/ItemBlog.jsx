import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Eye } from 'react-bootstrap-icons'; // Iconos de Bootstrap

import './ItemBlog.css';

const ItemBlog = ({ title, date, imageUrl, summary }) => {
 
    return (
      <Card className="mb-4 custom-card">
        <div className="image-overlay-container">
          <Card.Img variant="top" src={imageUrl} className="custom-card-img" />
          <div className="image-overlay"></div>
          <div className="text-overlay">
            <h5 className="title">{title}</h5>
            <p className="date"><i className="bi bi-calendar"></i> {date}</p>
          </div>
        </div>
        <Card.Body className="custom-card-body">
        <div className="d-flex justify-content-between custom-button-group">
          
          <Button variant="outline-secondary" className="btn-custom">
            <Eye className="me-2" /> Ver
          </Button>
          
        </div>
        </Card.Body>
      </Card>
  );
};

export default ItemBlog;
