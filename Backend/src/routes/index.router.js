// src/routes/index.js
import express from 'express';
import propertyRoutes from './property.routes.js';
import propertyDetailRoutes from './propertyDetail.routes.js';

const router = express.Router();

// Combina las rutas de propiedades y detalles de propiedades
router.use('/', propertyRoutes); // Rutas generales de propiedades
router.use('/api', propertyDetailRoutes); // Rutas para los detalles de propiedades

export default router;
