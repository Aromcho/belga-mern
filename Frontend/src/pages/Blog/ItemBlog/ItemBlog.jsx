import React from 'react';
import { Card } from 'react-bootstrap';
import './ItemBlog.css';

const ItemBlog = ({ title, date, imageUrl, summary }) => {
  return (
    <Card className="blog-card mb-4">
      <Card.Img variant="top" src={imageUrl} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="blog-summary">{summary}</Card.Text>
        <Card.Footer>
          <small className="text-muted">Publicado el: {date}</small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default ItemBlog;
