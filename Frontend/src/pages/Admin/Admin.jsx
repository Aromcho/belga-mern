import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from "./SideBar/SideBar.jsx";
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario

  useEffect(() => {
    const checkOnlineStatus = async () => {
      try {
        const response = await fetch('/api/sessions/online', {
          method: 'GET',
          credentials: 'include' // Asegúrate de incluir las cookies en esta solicitud
        });

        if (response.ok) {
          const data = await response.json();
          setIsOnline(true); // El usuario está online
          setUser(data.user); // Guarda los datos del usuario
          console.log('User is online:', data.user);
        } else {
          navigate('/login'); // Si no está online, redirige al login
        }
      } catch (error) {
        console.error('Error checking online status:', error);
        navigate('/login'); // Si hay un error, redirige al login
      }
    };

    checkOnlineStatus();
  }, [navigate]);
  
  return (
    <div className="admin-container d-flex mt-5">
      {isOnline ? (
        <>
          {/* Pasamos los datos del usuario como props al componente SideBar */}
          <SideBar user={user} />
        </>
      ) : (
        <p>Verificando acceso...</p>
      )}
    </div>
  );
};

export default Admin;
