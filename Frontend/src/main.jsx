import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactGA from 'react-ga4';
import './index.css';

// Inicializa Google Analytics con tu ID de medición
ReactGA.initialize('G-JQJ99XGWYV'); // Reemplaza con tu código de seguimiento GA4

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <Router>
        <App />
      </Router>
    </HelmetProvider>
  </StrictMode>
);
