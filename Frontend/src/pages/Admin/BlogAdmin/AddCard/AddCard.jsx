import React from 'react';
import { Card, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Plus, Save, Send } from 'react-bootstrap-icons';
import ImageIcon from '@mui/icons-material/Image';
import './AddCard.css';

const AddCard = () => {
  const [showModal, setShowModal] = React.useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

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
                <div className="input-icon">
                  <Plus className="plus-icon" />
                  <ImageIcon/>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="image-upload-placeholder">
                <div className="input-icon">
                  <Plus className="plus-icon" />
                  <ImageIcon />
                </div>
              </div>
            </Col>
          </Row>
          <Form>
            <Form.Group controlId="formHeader">
              <Form.Control type="text" placeholder="Encabezado..." className="form-input" />
            </Form.Group>
            <Form.Group controlId="formContent" className="mt-3">
              <Form.Control as="textarea" rows={6} placeholder="Contenido de la publicación..." className="form-input" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            <Save className="me-2" /> Guardar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            <Send className="me-2" /> Publicar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddCard;
