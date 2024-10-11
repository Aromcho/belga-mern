import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ItemBlogAdmin = ({ title, date, imageUrl }) => {
  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <small className="text-muted">{date}</small>
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="outline-danger">Borrar</Button>
          <Button variant="outline-secondary">Ver</Button>
          <Button variant="outline-primary">Editar</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ItemBlogAdmin;
