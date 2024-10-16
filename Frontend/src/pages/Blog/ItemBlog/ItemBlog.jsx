import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Calendar } from 'react-bootstrap-icons';

import './ItemBlog.css';

const ItemBlog = ({ id, title, date, imageUrl, subtitle }) => {

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
            <p className="date-card text-dark">
              <Calendar /> {date}
            </p>
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ItemBlog;
