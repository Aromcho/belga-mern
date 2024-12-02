import React, { useState } from 'react';
import { Card, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Plus, Save, Send } from 'react-bootstrap-icons';
import { FaImage, FaPlus } from 'react-icons/fa';  // Import image and plus icons
import './AddCard.css';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 

const AddCard = ({ onAdd }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    fakeDate: '',  // Nuevo campo para la fecha de publicación
  });
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [previewImage1, setPreviewImage1] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setPreviewImage1(null);
    setPreviewImage2(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      description: value,
    });
  };

  // Manejar la carga de la primera imagen
  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    setImage1(file);
    setPreviewImage1(URL.createObjectURL(file)); 
  };

  // Manejar la carga de la segunda imagen
  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    setImage2(file);
    setPreviewImage2(URL.createObjectURL(file)); 
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('subtitle', formData.subtitle);
    data.append('description', formData.description);
    data.append('category', formData.category);
    if (formData.fakeDate) {
      data.append('fakeDate', formData.fakeDate);
    }

    if (image1) data.append('photos', image1);
    if (image2) data.append('photos', image2);

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
        handleClose();
        onAdd(); 
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
      <Card className="add-card" onClick={handleShow}>
        <div className="add-icon-container">
          <Plus className="add-icon" />
        </div>
      </Card>

      <Modal className='modal-flotador mt-3' show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar nueva publicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-4">
            <Col md={6}>
              <div className="image-upload-container">
                <input 
                  type="file" 
                  name="photos1" 
                  onChange={handleImageChange1} 
                  className="image-upload-input" 
                />
                {!previewImage1 && (
                  <div className="upload-placeholder">
                    <FaPlus className="icon-plus" />
                    <FaImage className="icon-image" />
                    <p>Subir imagen</p>
                  </div>
                )}
                {previewImage1 && (
                  <div className="preview-overlay">
                    <img src={previewImage1} alt="preview1" className="preview-image" />
                  </div>
                )}
              </div>
            </Col>
            <Col md={6}>
              <div className="image-upload-container">
                <input 
                  type="file" 
                  name="photos2" 
                  onChange={handleImageChange2} 
                  className="image-upload-input" 
                />
                {!previewImage2 && (
                  <div className="upload-placeholder">
                    <FaPlus className="icon-plus" />
                    <FaImage className="icon-image" />
                    <p>Subir imagen</p>
                  </div>
                )}
                {previewImage2 && (
                  <div className="preview-overlay">
                    <img src={previewImage2} alt="preview2" className="preview-image" />
                  </div>
                )}
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
              <ReactQuill
                value={formData.description}
                onChange={handleDescriptionChange}
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
            <Form.Group controlId="formFakeDate" className="mt-3">
              <Form.Label>Fecha de Publicación Falsa</Form.Label>
              <Form.Control
                type="date"
                name="fakeDate"
                value={formData.fakeDate}
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
