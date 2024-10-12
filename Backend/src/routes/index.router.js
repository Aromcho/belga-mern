// src/routes/index.js
import express from 'express';
import propertyRoutes from './api/property.routes.js';
import developmentRoutes from './api/Development.routes.js';
import userRouter from './api/User.router.js';
import articuleRouter from './api/Articule.router.js';

const router = express.Router();

// Combina las rutas de propiedades y detalles de propiedades
router.use('/property', propertyRoutes); // Rutas para los detalles de propiedades
router.use('/development', developmentRoutes); // Rutas para las propiedades
router.use('/user', userRouter); // Rutas para los usuarios
router.use('/articule', articuleRouter); // Rutas para los articulos

export default router;
