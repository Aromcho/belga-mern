import Property from '../models/Property.model.js';

const renderPropertySEO = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findOne({ id: parseInt(id) }).lean();

    if (!property) {
      return res.status(404).send('Propiedad no encontrada');
    }

    // Seleccionar la imagen adecuada
    const ogImage =
      property.photos?.find(photo => photo.is_front_cover)?.image ||
      property.photos?.[0]?.image ||
      "https://belga.com.ar/images/og_image.png";

    // Genera el HTML con metaetiquetas dinámicas y redirige al frontend
    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${property.address} | Belga Inmobiliaria</title>
        <meta property="og:title" content="${property.address} | Belga Inmobiliaria">
        <meta property="og:description" content="${property.publication_title || property.address}">
        <meta property="og:url" content="http://www.belga.com.ar:8080/propiedad/${property.id}">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="Belga Inmobiliaria" />
        <meta property="og:image" content="${ogImage}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta http-equiv="refresh" content="0;url=/propertyDetail/${id}" />
      </head>
      <body>
      </body>
      </html>
    `;

    res.setHeader("Cache-Control", "public, max-age=3600");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);
  } catch (error) {
    console.error('Error al generar SEO dinámico:', error);
    res.status(500).send('Error al cargar la propiedad');
  }
};

export default renderPropertySEO;
