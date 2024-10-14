import ArticuleManager from "../manager/articule.manager.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import __dirname from '../../utils.js'; // Asegúrate de que esta ruta sea correcta

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext);
        cb(null, `${basename}-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({ storage }).array('photos', 4); // Permitir hasta 4 imágenes

export const createArticule = (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al subir las imágenes' });
        }
        
        try {
            const data = req.body;

            // Validar si hay archivos subidos
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ error: 'No se proporcionaron imágenes' });
            }

            const baseUrl = req.protocol + '://' + req.get('host');
            const photos = req.files.map(file => `${baseUrl}/uploads/${file.filename}`);

            const articule = await ArticuleManager.create({
                ...data,
                photos  // Guardar las URLs de las imágenes
            });

            res.status(201).json({
                message: 'Artículo creado con éxito',
                articule
            });
        } catch (error) {
            return next(error);
        }
    });
};


// Obtener todos los artículos
export const getArticules = async (req, res, next) => {
    try {
        const articules = await ArticuleManager.read();
        res.status(200).json(articules);
    } catch (error) {
        return next(error);
    }
};

// Obtener un artículo por ID
export const getArticuleById = async (req, res, next) => {
    try {
        const articule = await ArticuleManager.readOne(req.params.id);
        if (!articule) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        res.status(200).json(articule);
    } catch (error) {
        return next(error);
    }
};

// Actualizar un artículo con múltiples imágenes (opcional)
export const updateArticule = async (req, res, next) => {
    upload.array('photos', 4)(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al subir las imágenes' });
        }

        try {
            const { id } = req.params;
            const data = req.body;
            const baseUrl = req.protocol + '://' + req.get('host');
            const photos = req.files.map(file => `${baseUrl}/uploads/${file.filename}`);

            const updatedData = {
                ...data,
                ...(photos.length && { photos }) // Solo actualizar las imágenes si se proporcionan
            };

            const updatedArticule = await ArticuleManager.update(id, updatedData);
            if (!updatedArticule) {
                return res.status(404).json({ message: 'Artículo no encontrado' });
            }

            res.status(200).json(updatedArticule);
        } catch (error) {
            return next(error);
        }
    });
};

// Eliminar un artículo por ID
export const deleteArticule = async (req, res, next) => {
    try {
        const deletedArticule = await ArticuleManager.destroy(req.params.id);
        if (!deletedArticule) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        res.status(200).json({ message: 'Artículo eliminado con éxito' });
    } catch (error) {
        return next(error);
    }
};
