import Property from '../models/Property.model.js';
import PropertyManager from '../manager/property.manager.js';
import Fuse from 'fuse.js';
import fs from 'fs';
import path from 'path';

// Buscar propiedad por ID
const getpropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    // Convertir el id a número (si es necesario)
    const numericId = parseInt(id, 10);

    // Buscar la propiedad por el campo `id` (en lugar de `_id`) y usar lean() para optimizar
    const property = await property.findOne({ id: numericId }).lean(); // Usamos .lean()

    if (!property) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error('Error al obtener la propiedad:', error);
    res.status(500).json({ message: 'Error al obtener la propiedad' });
  }
};

const getProperties = async (req, res) => {
  try {
    const {
      operation_type, property_type, minRooms, maxRooms, minPrice, maxPrice,
      barrio, searchQuery, garages, limit = 10, offset = 0, order = 'DESC', is_starred
    } = req.query;

    // Crear un objeto con los filtros a aplicar
    const filterObj = {};

    // Filtro por tipo de operación
    if (operation_type && operation_type.length > 0) {
      filterObj['operations.operation_type'] = { $in: operation_type };
    }

    // Filtro por tipo de propiedad
    if (property_type && property_type !== '-1') {
      filterObj['type.name'] = { $in: property_type };
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
      filterObj['location.name'] = { $regex: barrio, $options: 'i' };
    }

    // Filtro de búsqueda general
    if (searchQuery && searchQuery.length > 0) {
      filterObj.$or = [
        { address: { $regex: searchQuery, $options: 'i' } },  // Buscar por dirección
        { 'location.full_location': { $regex: searchQuery, $options: 'i' } },  // Buscar por ubicación completa
        { 'location.name': { $regex: searchQuery, $options: 'i' } },  // Buscar por barrio
        { 'publication_title': { $regex: searchQuery, $options: 'i' } }, // Búsqueda por título
        { 'real_address': { $regex: searchQuery, $options: 'i' } }, // Búsqueda por dirección real
      ];
    }

    // Filtro por cocheras (garages)
    if (garages && parseInt(garages) > 0) {
      filterObj['parking_lot_amount'] = parseInt(garages);
    }

    if (is_starred === 'true') {
      filterObj.is_starred_on_web = true;
    }
    // Ordenar por precio
    const sortObj = order === 'desc' ? { 'operations.prices.price': -1 } : { 'operations.prices.price': 1 };

    const properties = await PropertyManager.paginate({
      filter: filterObj,
      opts: {
        sort: sortObj,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      },
      projection: 'id address suite_amount operations.prices location.name', // Limitar los campos seleccionados
      lean: true, // Optimizar las consultas con lean()
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
    const { id } = req.params;

    // Asumiendo que "id" es un campo en el documento que no es el ObjectId de MongoDB
    const property = await PropertyManager.readByCustomId(id); // Usamos el método que busca por 'id'

    if (!property) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }

    res.json(property);
  } catch (error) {
    console.error('Error al obtener la propiedad:', error);
    res.status(500).json({ message: 'Error al obtener la propiedad' });
  }
};


const getRelatedProperties = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, location, propertyType } = req.query;

    // 1. Buscar la propiedad de referencia usando el campo 'id' (no '_id')
    const currentProperty = await Property.findOne({ id: parseInt(id) }).lean();
    if (!currentProperty) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }

    const currentPrice = currentProperty.operations[0].prices[0].price;
    const currentLocation = currentProperty.location.name;
    const currentType = currentProperty.type.name;

    // 2. Configurar un margen de tolerancia para los precios (por ejemplo, ± 20%)
    const priceTolerance = 0.2; // 20% de margen
    const minPrice = currentPrice * (1 - priceTolerance);
    const maxPrice = currentPrice * (1 + priceTolerance);

    // 3. Intentar encontrar propiedades que coincidan en precio, ubicación y tipo
    let relatedProperties = await Property.find({
      "operations.prices.price": { $gte: minPrice, $lte: maxPrice },
      "location.name": currentLocation,
      "type.name": currentType,
      id: { $ne: currentProperty.id } // Excluir la propiedad actual
    }).lean();

    // 4. Si no encontramos propiedades, relajamos los criterios progresivamente
    if (relatedProperties.length === 0) {
      // Buscar solo por precio y tipo
      relatedProperties = await Property.find({
        "operations.prices.price": { $gte: minPrice, $lte: maxPrice },
        "type.name": currentType,
        id: { $ne: currentProperty.id }
      }).lean();
    }

    // 5. Si aún no hay resultados, relajamos aún más, buscando solo por precio
    if (relatedProperties.length === 0) {
      relatedProperties = await Property.find({
        "operations.prices.price": { $gte: minPrice, $lte: maxPrice },
        id: { $ne: currentProperty.id }
      }).lean();
    }

    // 6. Aplicar "puntuación" de coincidencia (cuantos más criterios coinciden, mayor es la puntuación)
    relatedProperties = relatedProperties.map((property) => {
      let score = 0;
      if (property.type.name === currentType) score += 2; // Coincidencia de tipo tiene más peso
      if (property.location.name === currentLocation) score += 1; // Coincidencia de ubicación
      return { ...property, score };
    });

    // 7. Ordenar las propiedades por la puntuación de coincidencia
    relatedProperties.sort((a, b) => b.score - a.score);

    // 8. Limitar el número de propiedades a devolver (por ejemplo, 5 propiedades)
    const maxResults = 5;
    const topRelatedProperties = relatedProperties.slice(0, maxResults);

    // 9. Enviar el resultado de las propiedades relacionadas
    res.status(200).json(topRelatedProperties);
  } catch (error) {
    console.error('Error al obtener propiedades relacionadas:', error);
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
    ]).lean(); // Usamos lean()

    res.status(200).json(neighborhoods);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener vecindarios', error });
  }
};

const getFavorites = async (req, res) => {
  try {
    const { list } = req.query;
    const ids = list.split(',').map(id => parseInt(id, 10));

    const properties = await PropertyManager.read({ id: { $in: ids } }).lean(); // Usamos lean()

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
    const properties = await PropertyManager.read({}, { id: 1 }).lean(); // Usamos lean()

    const ids = properties.map(property => property.id);

    res.status(200).json(ids);
  } catch (error) {
    console.error('Error al obtener los IDs de las propiedades:', error);
    res.status(500).json({ message: 'Error al obtener los IDs de las propiedades', error });
  }
};


const autocompleteProperties = async (req, res) => {
  const { query } = req.query;

  try {
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    // Cargar el archivo JSON
    const filePath = path.join(process.cwd(), 'direcciones_y_barrios.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const properties = JSON.parse(jsonData);

    // Configuración de Fuse.js
    const options = {
      keys: ['value'], // Solo buscamos en el campo 'value'
      threshold: 0.3,  // Nivel de coincidencia para errores tipográficos
    };

    // Inicializa Fuse.js con los datos del archivo JSON
    const fuse = new Fuse(properties, options);

    // Realiza la búsqueda difusa
    const results = fuse.search(query);

    // Mapea los resultados a la estructura que necesitas para la respuesta
    const response = results.map(({ item }) => ({
      value: item.value,
      secundvalue: item.secundvalue || ''  // Si no tiene secundvalue, dejamos vacío
    }));

    res.json(response);
  } catch (error) {
    console.error('Error en autocompletado con Fuse.js:', error);
    res.status(500).json({ message: 'Error en autocompletado con Fuse.js', error });
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
  getpropertyById,
  autocompleteProperties,
};
