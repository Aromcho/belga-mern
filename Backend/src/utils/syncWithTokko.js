import axios from 'axios';  
import Property from '../models/Property.model.js';

export const syncWithTokko = async () => {
  const limit = 20;
  let offset = 0;
  let total_count = 0;
  const syncedIds = new Set(); // Set para almacenar los IDs sincronizados

  try {
    console.log('Iniciando sincronización con Tokko...');

    do {
      console.log(`Obteniendo propiedades con offset: ${offset}`);

      const response = await axios.get('https://www.tokkobroker.com/api/v1/property/', {
        params: {
          key: process.env.TOKKO_TOKEN,
          limit,
          offset,
          lang: 'es_ar',
          format: 'json',
        },
      });

      const properties = response.data.objects.filter(property => property.id !== 4260629); // Excluir propiedad con ID 4260629
      total_count = response.data.meta.total_count;

      console.log(`Obtenidas ${properties.length} propiedades de un total de ${total_count}.`);

      const operations = properties.map(property => {
        syncedIds.add(property.id); // Almacena el ID de la propiedad sincronizada

        // Procesamiento de imágenes
        if (property.photos && Array.isArray(property.photos)) {
          property.photos = property.photos.map(img => ({
            image: img.image || '',
            description: img.description || '',
            is_blueprint: img.is_blueprint || false,
          }));
        } else {
          property.photos = [];
        }

        // Validación y procesamiento de operations
        if (property.operations && Array.isArray(property.operations)) {
          property.operations = property.operations.map(op => ({
            operation_type: op.operation_type || null,
            prices: op.prices.map(price => ({
              currency: price.currency,
              price: price.price || 0,
              period: price.period || ''
            }))
          }));
        } else {
          property.operations = [];
        }

        // Otras validaciones para branch, location, etc.
        if (property.branch && typeof property.branch === 'object') {
          property.branch = {
            ...property.branch,
            address: property.branch.address || '',
            email: property.branch.email || '',
            logo: property.branch.logo || '',
            phone: property.branch.phone || '',
          };
        }

        // Asegurarse de incluir la descripción completa
        property.description = property.description || '';
        property.rich_description = property.rich_description || '';

        // Construir el objeto para la operación bulkWrite
        return {
          updateOne: {
            filter: { id: property.id },
            update: { $set: property },
            upsert: true,
          }
        };
      });

      const result = await Property.bulkWrite(operations);
      console.log(`Actualizadas ${result.modifiedCount} propiedades, insertadas ${result.upsertedCount} propiedades.`);

      offset += limit;

    } while (offset < total_count);

    // Después de la sincronización, eliminar las propiedades que no están en Tokko
    await Property.deleteMany({
      id: { $nin: Array.from(syncedIds) } // Elimina las propiedades que no fueron sincronizadas
    });

    console.log('Sincronización completada y propiedades eliminadas si es necesario.');
  } catch (error) {
    console.error('Error al sincronizar con Tokko:', error);
  }
};
