import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cron from 'node-cron';
import cors from 'cors'; 
import connectDB from './src/utils/db.js';
import { syncWithTokko } from './src/utils/syncWithTokko.js';
import pathHandler from './src/middelwares/pathHandler.mid.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = 8090;
const app = express();
connectDB();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.SECRET));

// Configurar cron job para sincronización cada 5 minutos
cron.schedule('*/1 * * * *', () => {
  console.log('Ejecutando sincronización con Tokko cada 5 minutos');
  syncWithTokko();
});

// Endpoint manual de sincronización
app.get('/sync', async (req, res) => {
  await syncWithTokko();
  res.send('Sincronización con Tokko completada.');
});

// Manejo de errores
app.use(pathHandler);

app.listen(PORT, () => {
  console.log(`Microservicio de sincronización corriendo en http://localhost:${PORT}`);
});
