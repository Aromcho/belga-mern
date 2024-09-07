import express from 'express';
import {
  getProperties,
  getPropertyById,
  getRelatedProperties,
  getNeighborhoods,
  getFavorites,
  sendContactEmail,
  getAllPropertyIds // new function
} from '../controllers/property.controller.js';
import {  getpropertyDetailById } from '../controllers/propertyDetail.controller.js'



const propertyRouter = express.Router();

 propertyRouter.get('/properties', getProperties);
 propertyRouter.get('/propertyDetail/:id', getpropertyDetailById);
 propertyRouter.get('/neighborhoods', getNeighborhoods);
 propertyRouter.get('/:id', getPropertyById);
 propertyRouter.get('/related', getRelatedProperties);
 propertyRouter.get('/favorites', getFavorites);
 propertyRouter.post('/contact', sendContactEmail);
 propertyRouter.get('/properties/ids', getAllPropertyIds);

// details routes



export default propertyRouter;
