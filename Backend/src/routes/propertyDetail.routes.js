import express from 'express';
import {
  getProperties,
  getPropertyById,
  getRelatedProperties,
  getNeighborhoods,
  getFavorites,
  sendContactEmail,
  getAllPropertyIds, // new function
} from '../controllers/propertyDetail.controller.js';
import { getpropertyDetailById  } from '../controllers/propertyDetail.controller.js'



const propertyDetail = express.Router();

propertyDetail.get('/properties', getProperties);
propertyDetail.get('/propertyDetail/:id', getpropertyDetailById);
propertyDetail.get('/neighborhoods', getNeighborhoods);
propertyDetail.get('/:id', getPropertyById);
propertyDetail.get('/related', getRelatedProperties);
propertyDetail.get('/favorites', getFavorites);
propertyDetail.post('/contact', sendContactEmail);
propertyDetail.get('/properties/ids', getAllPropertyIds);

// details routes



export default propertyDetail;
