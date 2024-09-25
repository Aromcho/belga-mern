// src/routes/index.js
import express from 'express';
import propertyRoutes from './property.routes.js';

const router = express.Router();

// Combina las rutas de propiedades y detalles de propiedades
router.use('/api', propertyRoutes); // Rutas para los detalles de propiedades

export default router;
