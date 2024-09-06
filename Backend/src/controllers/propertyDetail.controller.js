// src/controllers/propertyDetail.controller.js

import propertyDetail from '../models/propertyDetails.model.js';

// Buscar propiedad por ID
export const getpropertyDetailById = async (req, res) => {
  const { id } = req.params;

  try {
    // Convertir el id a número (si es necesario)
    const numericId = parseInt(id, 10);

    // Buscar la propiedad por el campo `id` (en lugar de `_id`)
    const property = await propertyDetail.findOne({ id: numericId });

    if (!property) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error('Error al obtener la propiedad:', error);
    res.status(500).json({ message: 'Error al obtener la propiedad' });
  }
};
