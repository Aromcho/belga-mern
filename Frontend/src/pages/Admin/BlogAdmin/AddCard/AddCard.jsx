import React, { useState } from 'react';
import { Card, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Plus, Save, Send } from 'react-bootstrap-icons';
import './AddCard.css';
import axios from 'axios';
import Swal from 'sweetalert2'; // Para mostrar alertas

const AddCard = ({ onAdd }) => { // Recibimos la función onAdd como prop
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
  });
  const [images, setImages] = useState([]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('subtitle', formData.subtitle);
    data.append('description', formData.description);
    data.append('category', formData.category);

    // Agregar las imágenes al FormData
    images.forEach((image) => {
      data.append('photos', image);
    });

    try {
      const response = await axios.post('/api/articule', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Artículo creado',
          text: 'El artículo se ha creado con éxito.',
        });
        handleClose(); // Cierra el modal
        onAdd(); // Actualiza la lista de artículos llamando a fetchArticles
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Ocurrió un error: ${response.statusText}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el artículo',
        text: error.response?.data?.error || 'Ocurrió un error desconocido.',
      });
    }
  };

  return (
    <>
      {/* Card para abrir el modal */}
      <Card className="add-card" onClick={handleShow}>
        <div className="add-icon-container">
          <Plus className="add-icon" />
        </div>
      </Card>

      {/* Modal que aparece cuando se hace clic en la tarjeta */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar nueva publicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-4">
            <Col md={6}>
              <div className="image-upload-placeholder">
                <input type="file" name="photos" multiple onChange={handleImageChange} />
              </div>
            </Col>
            <Col md={6}>
              <div className="image-upload-placeholder">
                <input type="file" name="photos" multiple onChange={handleImageChange} />
              </div>
            </Col>
          </Row>
          <Form>
            <Form.Group controlId="formHeader">
              <Form.Control
                type="text"
                placeholder="Encabezado..."
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-input"
              />
            </Form.Group>
            <Form.Group controlId="formSubtitle" className="mt-3">
              <Form.Control
                type="text"
                placeholder="Subtítulo..."
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                className="form-input"
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Descripción de la publicación..."
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-input"
              />
            </Form.Group>
            <Form.Group controlId="formCategory" className="mt-3">
              <Form.Control
                type="text"
                placeholder="Categoría..."
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-input"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            <Save className="me-2" /> Guardar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            <Send className="me-2" /> Publicar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddCard;
