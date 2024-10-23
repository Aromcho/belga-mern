import React, { useState, useEffect } from 'react';
import { Table, Button, Tooltip, OverlayTrigger, Modal, Form } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('/api/user', newUser);
      console.log('Usuario creado:', response.data);
      setShowCreateModal(false);
      fetchUsers(); // Actualiza la lista de usuarios después de crear uno nuevo
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  // Función para cargar los usuarios desde la API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/user/');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Error loading users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Eliminar un usuario
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/user/${userId}`);
      setUsers(users.filter((user) => user._id !== userId)); // Eliminar el usuario de la lista local
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  // Editar un usuario (mostrar modal)
  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setShowEditModal(true);
  };

  // Guardar cambios (PUT request)
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`/api/user/${selectedUser._id}`, formData);
      setUsers(users.map((user) => (user._id === selectedUser._id ? response.data : user))); // Actualiza la lista de usuarios
      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Button variant="primary" onClick={() => setShowCreateModal(true)}>
        Crear Usuario
      </Button>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                placeholder="Ingrese el nombre"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                placeholder="Ingrese el email"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                placeholder="Ingrese la contraseña"
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Rol</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
              >
                <option value="user">Usuario</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderador</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreateUser}>
            Crear Usuario
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <Avatar />
              </td>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="mr-2"
                    onClick={() => handleEdit(user)}
                  >
                    <PencilSquare />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Eliminar</Tooltip>}>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(user._id)}>
                    <Trash />
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para editar usuario */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUserName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formUserEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formUserRole">
              <Form.Label>Rol</Form.Label>
              <Form.Control
                as="select"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="user">Usuario</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderador</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserManagement;