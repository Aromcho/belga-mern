import PropertyManager from '../manager/property.manager.js';

const getProperties = async (req, res) => {
  try {
    const { limit = 20, offset = 0, order = 'DESC', ...filters } = req.query;

    // Create the filter object
    const filterObj = {};

    // Filtering by operation type
    if (filters.operation_type && filters.operation_type.length > 0) {
      filterObj['operations.operation_type'] = { $in: filters.operation_type };
    }

    // Filtering by custom tags (e.g., property type)
    if (filters.property_type && filters.property_type !== '-1') {
      const typesArray = filters.property_type.split(',').map(Number);
      filterObj['custom_tags.id'] = { $in: typesArray };
    }

    // Filtering by location
    if (filters.locations && filters.locations.length > 0) {
      filterObj['location.divisions.name'] = { $in: filters.locations };
    }

    // Filtering by price range
    if (filters.price_from || filters.price_to) {
      filterObj['operations.prices.price'] = {};
      if (filters.price_from) {
        filterObj['operations.prices.price'].$gte = parseInt(filters.price_from);
      }
      if (filters.price_to) {
        filterObj['operations.prices.price'].$lte = parseInt(filters.price_to);
      }
    }

    // Filtering by number of rooms
    if (filters.min_rooms || filters.max_rooms) {
      filterObj['operations.suite_amount'] = {};
      if (filters.min_rooms) {
        filterObj['operations.suite_amount'].$gte = parseInt(filters.min_rooms);
      }
      if (filters.max_rooms) {
        filterObj['operations.suite_amount'].$lte = parseInt(filters.max_rooms);
      }
    }

    // Filtering by number of bathrooms
    if (filters.min_baths || filters.max_baths) {
      filterObj['operations.bathroom_amount'] = {};
      if (filters.min_baths) {
        filterObj['operations.bathroom_amount'].$gte = parseInt(filters.min_baths);
      }
      if (filters.max_baths) {
        filterObj['operations.bathroom_amount'].$lte = parseInt(filters.max_baths);
      }
    }

    // Filtering by parking lots
    if (filters.parking_lot_from || filters.parking_lot_to) {
      filterObj['operations.parking_lot_amount'] = {};
      if (filters.parking_lot_from) {
        filterObj['operations.parking_lot_amount'].$gte = parseInt(filters.parking_lot_from);
      }
      if (filters.parking_lot_to) {
        filterObj['operations.parking_lot_amount'].$lte = parseInt(filters.parking_lot_to);
      }
    }

    // Sorting the results
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

export {
  getProperties,
  getPropertyById,
  getRelatedProperties,
  getNeighborhoods,
  getFavorites,
  sendContactEmail,
};
