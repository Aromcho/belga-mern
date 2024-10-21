import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      return response.data;  // Devolver los datos de respuesta para su uso
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    try {
      await axios.delete('/api/sessions/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      throw new Error('Logout failed');
    }
  };

  const isAdmin = () => user && user.role === 'ADMIN'; // Método para verificar si el usuario es ADMIN

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
