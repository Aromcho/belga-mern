import express from 'express';
import {
  getProperties,
  getPropertyById,
  getRelatedProperties,
  getNeighborhoods,
  getFavorites,
  sendContactEmail,
} from '../controllers/property.controller.js';

const router = express.Router();

router.get('/properties', getProperties);
router.get('/neighborhoods', getNeighborhoods);
router.get('/:id', getPropertyById);
router.get('/related', getRelatedProperties);
router.get('/favorites', getFavorites);
router.post('/contact', sendContactEmail);

export default router;
