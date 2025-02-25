import Development from '../models/Development.model.js';

const renderDevelopmentSEO = async (req, res) => {
  const { id } = req.params;
  const userAgent = req.headers["user-agent"] || "";

  // Expresión regular para detectar bots
  const isBot = /bot|crawl|spider|slurp|facebook|whatsapp|telegram|twitter|linkedin/i.test(userAgent);

  try {
    const development = await Development.findOne({ id: parseInt(id) }).lean();

    if (!development) {
      return res.status(404).send('Emprendimiento no encontrado');
    }

    // Seleccionar la imagen adecuada
    const ogImage =
      development.photos?.find(photo => photo.is_front_cover)?.image ||
      development.photos?.[0]?.image ||
      "https://belga.com.ar/images/og_image.png";

    // Si es un bot, devolver el HTML con las etiquetas SEO
    if (isBot) {
      const html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${development.name} | Emprendimientos - Belga Inmobiliaria</title>
          <meta property="og:title" content="${development.name} | Belga Inmobiliaria">
          <meta property="og:description" content="${development.description || development.name}">
          <meta property="og:url" content="https://www.belga.com.ar/emprendimientos/${development.id}">
          <meta property="og:type" content="website">
          <meta property="og:site_name" content="Belga Inmobiliaria" />
          <meta property="og:image" content="${ogImage}">
          <meta property="og:image:width" content="1200">
          <meta property="og:image:height" content="630">
        </head>
        <body></body>
        </html>
      `;

      res.setHeader("Cache-Control", "public, max-age=3600");
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html);
    }

    // Si NO es un bot, redirigir al frontend
    return res.redirect(301, `/emprendimientosDetail/${id}`);

  } catch (error) {
    console.error('Error al generar SEO dinámico para emprendimientos:', error);
    res.status(500).send('Error al cargar el emprendimiento');
  }
};

export default renderDevelopmentSEO;
