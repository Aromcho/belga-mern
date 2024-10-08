// src/routes/index.js
import express from 'express';
import propertyRoutes from './property.routes.js';
import developmentRoutes from './Development.routes.js';

const router = express.Router();

// Combina las rutas de propiedades y detalles de propiedades
router.use('/property', propertyRoutes); // Rutas para los detalles de propiedades
router.use('/development', developmentRoutes); // Rutas para las propiedades

export default router;
