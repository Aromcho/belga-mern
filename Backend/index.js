import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cron from 'node-cron';
import connectDB from './src/config/db.js';
import propertyRoutes from './src/routes/property.routes.js';
import { syncWithTokko } from './src/utils/syncWithTokko.js'; // Importa la función

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());

connectDB();

app.use(express.static('public'));

app.use('/api', propertyRoutes);

// Configurar el cron job para que se ejecute cada minuto (para pruebas)
cron.schedule('0 */6 * * *', () => { // Ejecuta cada 6 horas
  console.log('Running cron job to sync with Tokko');
  syncWithTokko();
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
