import React, { useContext, useEffect, useState } from 'react';
import SideBar from './SideBar/SideBar';
import { AuthContext } from '../../context/AuthContext';
import Login from '../../components/Login/Login.jsx';
import './Admin.css';
import Swal from 'sweetalert2';

const Admin = () => {
  const { user, loading, isAdmin } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user || !isAdmin()) {
        setIsLoggedIn(false);
        setShowLogin(true);
        if (user && !isAdmin()) {
          Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'No tienes permiso para acceder a esta sección',
          }).then(() => {
            window.location.href = '/'; // Redirigir al home
          });
        }
      } else {
        setIsLoggedIn(true);
        setShowLogin(false);
      }
    }
  }, [user, loading]);

  return (
    <div className="admin-container d-flex mt-5">
      {isLoggedIn ? <SideBar /> : showLogin && <Login />}
    </div>
  );
};

export default Admin;
