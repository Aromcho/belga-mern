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



const router = express.Router();

router.get('/properties', getProperties);
router.get('/propertyDetail/:id', getpropertyDetailById);
router.get('/neighborhoods', getNeighborhoods);
router.get('/:id', getPropertyById);
router.get('/related', getRelatedProperties);
router.get('/favorites', getFavorites);
router.post('/contact', sendContactEmail);
router.get('/properties/ids', getAllPropertyIds);

export default router;
