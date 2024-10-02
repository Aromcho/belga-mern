import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cron from 'node-cron';
import cors from 'cors'; 
import connectDB from './src/utils/db.js';
import { syncWithTokko } from './src/utils/syncWithTokko.js';
import router from './src/routes/index.router.js';
import pathHandler from './src/middelwares/pathHandler.mid.js';
import path from 'path';
import { fileURLToPath } from 'url'; // Para obtener __dirname si usas módulos ES6

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use(express.static('public'));
app.use('/api', router);

// Configurar los cron jobs para sincronización
cron.schedule('0 * * * *', () => {
  console.log('Running cron job to sync with Tokko');
  syncWithTokko();
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});

// Ruta catch-all para servir index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// Manejo de errores
app.use(pathHandler);
