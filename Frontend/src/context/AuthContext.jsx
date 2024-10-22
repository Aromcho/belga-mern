  import React, { createContext, useState, useEffect } from 'react';
  import axios from 'axios';

  export const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Verifica si el usuario está autenticado al cargar la aplicación
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axios.get('/api/sessions/online', { withCredentials: true });
          setUser(response.data.user);
        } catch (error) {
          setUser(null); // Si no está autenticado, se asegura que el usuario sea null
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, []);

    const login = async (email, password) => {
      try {
        const response = await axios.post('/api/sessions/login', { email, password }, { withCredentials: true });
        setUser(response.data.user);
        return response.data;  // Devuelve los datos de respuesta
      } catch (error) {
        throw new Error('Login failed');
      }
    };

    const logout = async () => {
      try {
        await axios.post('/api/sessions/logout', {}, { withCredentials: true });
        setUser(null); // Elimina el usuario en el contexto
      } catch (error) {
        throw new Error('Logout failed');
      }
    };

    const isAdmin = () => user && user.role === 'ADMIN'; // Verifica si el usuario es ADMIN

    return (
      <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
        {children}
      </AuthContext.Provider>
    );
  };
