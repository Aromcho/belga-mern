import React, { useState, useEffect } from 'react';
import { Card, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaPlus, FaImage } from 'react-icons/fa';
import { Trash, Eye, PencilSquare } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ItemBlogAdmin.css';

const ItemBlogAdmin = ({ id, title, date, imageUrl, onDelete }) => {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
  });
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [previewImage1, setPreviewImage1] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);

  // Función para cargar los datos del artículo para edición
  const fetchArticuleData = async () => {
    try {
      const response = await axios.get(`/api/articule/${id}`);
      const { title, subtitle, description, category, photos } = response.data;

      setEditFormData({ title, subtitle, description, category });

      if (photos.length > 0) {
        setPreviewImage1(photos[0]);
        if (photos.length > 1) setPreviewImage2(photos[1]);
      }

      setShowEditModal(true);
    } catch (error) {
      console.error('Error al cargar el artículo para edición:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar el artículo',
        text: error.response?.data?.message || 'Ocurrió un error desconocido.',
      });
    }
  };

  // Función para manejar la edición
  const handleEdit = () => {
    fetchArticuleData();
  };

  // Funciones para manejar la carga de imágenes
  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    setImage1(file);
    setPreviewImage1(URL.createObjectURL(file));
  };

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    setImage2(file);
    setPreviewImage2(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDescriptionChange = (value) => {
    setEditFormData({
      ...editFormData,
      description: value,
    });
  };
  const handleView = () => {
    navigate(`/blog/${id}`); // Redirige a la página de detalles del artículo
  };
  const handleUpdate = async () => {
    const data = new FormData();
    data.append('title', editFormData.title);
    data.append('subtitle', editFormData.subtitle);
    data.append('description', editFormData.description);
    data.append('category', editFormData.category);

    if (image1) data.append('photos', image1);
    if (image2) data.append('photos', image2);

    try {
      const response = await axios.put(`/api/articule/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Artículo actualizado',
          text: 'El artículo se ha actualizado con éxito.',
        });
        setShowEditModal(false);
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
        title: 'Error al actualizar el artículo',
        text: error.response?.data?.message || 'Ocurrió un error desconocido.',
      });
    }
  };

  const handleDelete = async () => {
    const confirmDelete = await Swal.fire({
      title: '¿Estás seguro de que deseas borrar este artículo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'Cancelar',
    }).then((result) => result.isConfirmed);

    if (confirmDelete) {
      try {
        await axios.delete(`/api/articule/${id}`);
        onDelete(id);
      } catch (error) {
        console.error('Error al borrar el artículo', error);
      }
    }
  };

  return (
    <>
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

      {/* Modal de Edición */}
      <Modal className='modal-flotador mt-3' show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar publicación</Modal.Title>
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
                {previewImage1 ? (
                  <div className="preview-overlay">
                    <img src={previewImage1} alt="preview1" className="preview-image" />
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <FaPlus className="icon-plus" />
                    <FaImage className="icon-image" />
                    <p>Subir imagen</p>
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
                {previewImage2 ? (
                  <div className="preview-overlay">
                    <img src={previewImage2} alt="preview2" className="preview-image" />
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <FaPlus className="icon-plus" />
                    <FaImage className="icon-image" />
                    <p>Subir imagen</p>
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
                value={editFormData.title}
                onChange={handleInputChange}
                className="form-input"
              />
            </Form.Group>
            <Form.Group controlId="formSubtitle" className="mt-3">
              <Form.Control
                type="text"
                placeholder="Subtítulo..."
                name="subtitle"
                value={editFormData.subtitle}
                onChange={handleInputChange}
                className="form-input"
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <ReactQuill
                value={editFormData.description}
                onChange={handleDescriptionChange}
                className="form-input"
              />
            </Form.Group>
            <Form.Group controlId="formCategory" className="mt-3">
              <Form.Control
                type="text"
                placeholder="Categoría..."
                name="category"
                value={editFormData.category}
                onChange={handleInputChange}
                className="form-input"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ItemBlogAdmin;
