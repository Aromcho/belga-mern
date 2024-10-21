import React, { useEffect, useContext, useState } from 'react';
import SideBar from './SideBar/SideBar';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './Admin.css';
import { Modal } from '@mui/material';
import Login from '../../components/Login/Login.jsx';

const Admin = () => {
  const { setUser } = useContext(AuthContext); // Obtener setUser para manejar el cierre de sesión
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está logueado
  const [openModal, setOpenModal] = useState(false); // Controla si el modal está abierto

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const response = await axios.get('/api/sessions/online', { withCredentials: true });
        if (response.status === 200) {
          setIsLoggedIn(true); // Usuario está logueado
        } else {
          setIsLoggedIn(false); // Usuario no está logueado
          setOpenModal(true); // Abrir modal para iniciar sesión
        }
        console.log('Is user online?', response);
      } catch (error) {
        setIsLoggedIn(false); // Si hay un error, considera al usuario no logueado
        setOpenModal(true); // Abrir modal si no está logueado
        console.error('Error checking online status:', error);
      }
    };

    checkIfLoggedIn();
  }, []);

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await axios.delete('/api/sessions/logout', {}, { withCredentials: true }); // Usar POST para logout
      console.log('Logout successful');
      setUser(null); // Limpiar usuario en el contexto
      setIsLoggedIn(false); // Actualizar el estado
      setOpenModal(true); // Mostrar el modal para iniciar sesión
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isAdmin = async () => {
    try {
      const response = await axios.get('/api/sessions/online', { withCredentials: true });
      const role = response.data.user.role;
      if (role === "ADMIN") {
        console.log('User is admin');
      } else {
        console.log('User is not admin');
        setIsLoggedIn(false); // Usuario no es admin, actualizar estado
        setOpenModal(true); // Mostrar el modal para iniciar sesión
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsLoggedIn(false); // Si hay un error, considera al usuario no logueado
      setOpenModal(true); // Abrir modal si no está logueado
    }
  };

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const response = await axios.get('/api/sessions/online', { withCredentials: true });
        if (response.status === 200) {
          setIsLoggedIn(true); // Usuario está logueado
          isAdmin(); // Verificar si el usuario es admin
        } else {
          setIsLoggedIn(false); // Usuario no está logueado
          setOpenModal(true); // Abrir modal para iniciar sesión
        }
        console.log('Is user online?', response);
      } catch (error) {
        setIsLoggedIn(false); // Si hay un error, considera al usuario no logueado
        setOpenModal(true); // Abrir modal si no está logueado
        console.error('Error checking online status:', error);
      }
    };

    checkIfLoggedIn();
  }, []);

  return (
    <div className="admin-container d-flex mt-5">
      {isLoggedIn ? (
                  <Login />

      ) : (
        <p>No tienes acceso a esta sección</p>
      )}
<>
          <SideBar />
        </>
      
       
    </div>
  );
};

export default Admin;
