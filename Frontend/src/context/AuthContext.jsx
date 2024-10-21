import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar la aplicación
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/sessions/online', { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
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
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const isOnline = async () => {
    try {
      const response = await axios.get('/api/sessions/online');
      return response.data;
    } catch (error) {
      return error.response; 
    }
  }
  const logout = async () => {
    try {
      await axios.post('/api/sessions/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      throw new Error('Logout failed');
    }
  };
  // crear is admin para revisar el rol del usuario
  
  return (
    <AuthContext.Provider value={{ user, loading, login,isOnline, logout }}>
      {children}
    </AuthContext.Provider>
  );
};