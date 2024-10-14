import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Trash, Eye, PencilSquare } from 'react-bootstrap-icons'; // Iconos de Bootstrap
import './ItemBlogAdmin.css'; // Archivo CSS personalizado  
import { useNavigate } from 'react-router-dom'; // Actualización a useNavigate
import axios from 'axios'; // Para hacer las solicitudes HTTP
import Swal from 'sweetalert2'; // Para mostrar alertas

const ItemBlogAdmin = ({ id, title, date, imageUrl, onDelete }) => {
  const navigate = useNavigate(); // Hook para redireccionar a otras rutas

  // Función para manejar el borrado con confirmación
  const handleDelete = async () => {
    const confirmDelete = await Swal.fire({
      title: '¿Estás seguro de que deseas borrar este artículo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'Cancelar'
    }).then((result) => result.isConfirmed);
    if (confirmDelete) {
      try {
        await axios.delete(`/api/articule/${id}`); // Reemplaza por tu ruta de borrado
        onDelete(id); // Llamada a la función para actualizar la lista en el frontend
      } catch (error) {
        console.error('Error al borrar el artículo', error);
      }
    }
  };

  // Función para ver el artículo
  const handleView = () => {
    navigate(`/blog/${id}`); // Redirige a la página de detalles del artículo
  };

  // Función para editar el artículo
  const handleEdit = () => {
    navigate(`/admin/editar/${id}`); // Redirige a la página de edición del artículo
  };

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
          <Button variant="outline-danger" className="btn-custom" onClick={handleDelete}>
            <Trash className="me-2" /> Borrar
          </Button>
          <Button variant="outline-secondary" className="btn-custom" onClick={handleView}>
            <Eye className="me-2" /> Ver
          </Button>
          <Button variant="outline-primary" className="btn-custom" onClick={handleEdit}>
            <PencilSquare className="me-2" /> Editar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ItemBlogAdmin;
