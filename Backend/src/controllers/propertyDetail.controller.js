// src/controllers/propertyDetail.controller.js

import propertyDetail from '../models/propertyDetails.model.js';
import PropertyManager from '../manager/propertyDetail.manager.js';

// Buscar propiedad por ID
 const getpropertyDetailById = async (req, res) => {
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
}

const getProperties = async (req, res) => {
  try {
    const { operation_type, property_type, minRooms, maxRooms, minPrice, maxPrice, barrio, searchQuery, garages, limit = 20, offset = 0, order = 'DESC' } = req.query;

    // Crear un objeto con los filtros a aplicar
    const filterObj = {};

    // Filtro por tipo de operación
    if (operation_type && operation_type.length > 0) {
      filterObj['operations.operation_type'] = operation_type;
    }

    // Filtro por tipo de propiedad
    if (property_type && property_type !== '-1') {
      filterObj['type.name'] = property_type;
    }

    // Filtro por cantidad de habitaciones
    if (minRooms || maxRooms) {
      filterObj['suite_amount'] = {};
      if (minRooms) {
        filterObj['suite_amount'].$gte = parseInt(minRooms);
      }
      if (maxRooms) {
        filterObj['suite_amount'].$lte = parseInt(maxRooms);
      }
    }

    // Filtro por rango de precios
    if (minPrice || maxPrice) {
      filterObj['operations.prices.price'] = {};
      if (minPrice) {
        filterObj['operations.prices.price'].$gte = parseInt(minPrice);
      }
      if (maxPrice) {
        filterObj['operations.prices.price'].$lte = parseInt(maxPrice);
      }
    }

    // Filtro por barrio
    if (barrio && barrio.length > 0) {
      filterObj['location.name'] = barrio;
    }

    // Filtro de búsqueda general
    if (searchQuery && searchQuery.length > 0) {
      filterObj.$or = [
        { address: { $regex: searchQuery, $options: 'i' } },  // Buscar por dirección
        { 'location.full_location': { $regex: searchQuery, $options: 'i' } },  // Buscar por ubicación completa
        { 'location.name': { $regex: searchQuery, $options: 'i' } },  // Buscar por barrio
        { 'type.name': { $regex: searchQuery, $options: 'i' } },  // Buscar por tipo de propiedad
        { 'producer.name': { $regex: searchQuery, $options: 'i' } },  // Buscar por productor
        { 'publication_title': { $regex: searchQuery, $options: 'i' } }, // Búsqueda por título
        { 'real_address': { $regex: searchQuery, $options: 'i' } }, // Búsqueda por dirección real
      ];
    }
    

    // Filtro por cocheras (garages)
    if (garages && parseInt(garages) > 0) {
      filterObj['parking_lot_amount'] = parseInt(garages);
    }

    // Ordenar por precio
    const sortObj = order === 'DESC' ? { 'operations.prices.price': -1 } : { 'operations.prices.price': 1 };

    const properties = await PropertyManager.paginate({
      filter: filterObj,
      opts: {
        sort: sortObj,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      },
    });

    const total_count = properties.totalDocs;

    res.json({
      meta: {
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        total_count,
      },
      objects: properties.docs,
    });
  } catch (error) {
    console.error('Error al obtener propiedades:', error);
    res.status(500).json({ message: 'Error al obtener propiedades', error });
  }
};





  
  
  const getPropertyById = async (req, res) => {
    try {
      const property = await PropertyManager.readOne(req.params.id);
  
      if (!property) {
        return res.status(404).json({ message: 'Propiedad no encontrada' });
      }
  
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la propiedad', error });
    }
  };
  
  const getRelatedProperties = async (req, res) => {
    try {
      const { price, location, propertyType } = req.query;
  
      const properties = await PropertyManager.read({
        price: { $lte: price * 1.2, $gte: price * 0.8 },
        "location.city": location,
        "custom_tags.name": propertyType,
      });
  
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener propiedades relacionadas', error });
    }
  };
  
  const getNeighborhoods = async (req, res) => {
    try {
      const neighborhoods = await PropertyManager.aggregate([
        {
          $group: {
            _id: "$location.city",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ]);
  
      res.status(200).json(neighborhoods);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener vecindarios', error });
    }
  };
  
  const getFavorites = async (req, res) => {
    try {
      const { list } = req.query;
      const ids = list.split(',').map(id => parseInt(id, 10));
  
      const properties = await PropertyManager.read({ id: { $in: ids } });
  
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener propiedades favoritas', error });
    }
  };
  
  const sendContactEmail = async (req, res) => {
    try {
      const { body } = req;
      const mailjet = new Mailjet({
        apiKey: process.env.MJ_APIKEY_PUBLIC,
        apiSecret: process.env.MJ_APIKEY_PRIVATE,
      });
  
      const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: "info@belga.com.ar",
              Name: "Belga Inmobiliaria",
            },
            To: [
              { email: 'info@belga.com.ar' },
              { email: 'AR5054@resultadistas.com' },
            ],
            Subject: body.subject || "Contacto",
            TextPart: `
              Nueva consulta ${body.subject || "Contacto"}
              URL: ${body.url}
              Nombre: ${body.name}.
              Teléfono de contacto: ${body.phone}.
              E-mail: ${body.email}
              Mensaje: ${body.message || body.message}
              Tipo de Propiedad: ${body.property || body.property}
              Dirección: ${body.direction || body.direction}
            `,
          },
        ],
      });
  
      await request;
      res.status(200).json({ code: 1 });
    } catch (error) {
      res.status(400).json({ code: 0, error: error.statusCode, body: error.body });
    }
  };
  const getAllPropertyIds = async (req, res) => {
    try {
      // Buscar todas las propiedades y devolver solo los IDs
      const properties = await PropertyManager.read({}, { id: 1 }); // Solo obtenemos el campo 'id'
      
      const ids = properties.map(property => property.id); // Crear una lista solo de los IDs
      
      res.status(200).json(ids);
    } catch (error) {
      console.error('Error al obtener los IDs de las propiedades:', error);
      res.status(500).json({ message: 'Error al obtener los IDs de las propiedades', error });
    }
  };
  const autocompleteProperties = async (req, res) => {
    const { query } = req.query; // Tomamos la consulta del usuario
  
    try {
      if (!query) {
        return res.status(400).json({ message: 'Query is required' });
      }
  
      // Buscamos solo en los campos relevantes: address, location.name, type.name y producer.name
      const properties = await propertyDetail.find({
        $or: [
          { address: { $regex: query, $options: 'i' } }, // Búsqueda por dirección
          { 'location.full_location': { $regex: query, $options: 'i' } }, // Búsqueda por ubicación
          { 'location.name': { $regex: query, $options: 'i' } }, // Búsqueda por barrio
          { 'type.name': { $regex: query, $options: 'i' } }, // Búsqueda por tipo de propiedad
          { 'producer.name': { $regex: query, $options: 'i' } }, // Búsqueda por productor
        ],
      }).limit(10); // Limitamos a 10 resultados
  
      res.json(properties.map((property) => ({
        id: property.id,
        location: property.location.name,
        full_location: property.location.full_location,
        type: property.type.name,
        address: property.address,
      })));
    } catch (error) {
      console.error('Error en autocompletado:', error);
      res.status(500).json({ message: 'Error en autocompletado', error });
    }
  };
  
  
  
  export {
    getProperties,
    getPropertyById,
    getRelatedProperties,
    getNeighborhoods,
    getFavorites,
    sendContactEmail,
    getAllPropertyIds,
    getpropertyDetailById,
    autocompleteProperties,
  };
  


