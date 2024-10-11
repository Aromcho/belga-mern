import React, { useState, useEffect } from 'react';
import { Table, Button, Image, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons'; // Asegúrate de instalar react-bootstrap-icons
import Avatar from '@mui/material/Avatar';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  // Simulamos la carga de usuarios en lugar de llamar a una API
  useEffect(() => {
    const simulatedUsers = [
      {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@example.com',
        role: 'admin',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        role: 'user',
      },
      {
        id: '3',
        name: 'Alice Brown',
        email: 'alicebrown@example.com',
        role: 'user',
      },
      {
        id: '4',
        name: 'Bob Johnson',
        email: 'bobjohnson@example.com',
        role: 'moderator',
      },
    ];

    setUsers(simulatedUsers);
  }, []);

  return (
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
          <tr key={user.id}>
            <td>
              <Avatar/>
            </td>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
                <Button variant="outline-primary" size="sm" className="mr-2">
                  <PencilSquare />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger overlay={<Tooltip>Eliminar</Tooltip>}>
                <Button variant="outline-danger" size="sm">
                  <Trash />
                </Button>
              </OverlayTrigger>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserManagement;
