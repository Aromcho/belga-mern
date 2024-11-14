import Property from '../models/Property.model.js'; // Modelo de Propiedad

const renderPropertySEO = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findOne({ id: parseInt(id) }).lean();

    if (!property) {
      return res.status(404).send('Propiedad no encontrada');
    }

    // Genera el HTML con metaetiquetas dinámicas y redirige al frontend
    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${property.address} | Belga Inmobiliaria</title>
        <meta property="og:title" content="${property.address} | Belga Inmobiliaria">
        <meta property="og:description" content="${property.publication_title}">
        <meta property="og:image" content="${property.photos?.[0]?.image || 'https://belga.com.ar/default-image.jpg'}">
        <meta property="og:url" content="https://belga.com.ar/propiedad/${property.id}">
        <meta property="og:type" content="website">
        <meta http-equiv="refresh" content="0;url=/propertyDetail/${id}" />
      </head>
      <body>
      </body>
      </html>
    `;

    res.status(200).send(html);
  } catch (error) {
    console.error('Error al generar SEO dinámico:', error);
    res.status(500).send('Error al cargar la propiedad');
  }
};

export default renderPropertySEO;
