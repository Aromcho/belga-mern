import fs from 'fs';
import path from 'path';
import Property from '../models/property.model.js'; // Asegúrate de que el modelo está bien definido
import connectDB from '../utils/db.js'; // Tu conexión a MongoDB
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno

export const generateJSON = async () => {
  try {
    // Conexión a la base de datos
    await connectDB();

    // Obtener todas las direcciones y barrios
    const properties = await Property.find({}, 'address location.name').lean();

    // Combinar direcciones y barrios en el mismo nivel
    const combinedData = properties.flatMap((property) => {
      const data = [];
      if (property.address) {
        data.push({ value: property.address });
      }
      if (property.location?.name) {
        data.push({ value: property.location.name });
      }
      return data;
    });

    // Eliminar duplicados
    const uniqueData = Array.from(new Set(combinedData.map((item) => item.value)))
      .map((value) => ({ value }));

    // Guardar el archivo JSON
    const filePath = path.join(process.cwd(), 'direcciones_y_barrios.json');
    fs.writeFileSync(filePath, JSON.stringify(uniqueData, null, 2));

    console.log(`Archivo generado exitosamente: ${filePath}`);
  } catch (error) {
    console.error('Error al generar el archivo JSON:', error);
  }
};

// Ejecutar el script
