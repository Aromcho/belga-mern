import ArticuleManager from "../manager/articule.manager.js";

export const createArticule = async (req, res, next) => {
    try {
        const articule = await ArticuleManager.create(req.body);
        res.status(201).json( {message: 'Article created successfully',
            product: articule});
    } catch (error) {
        return next(error);
    }
}

export const getArticules = async (req, res, next) => {
    try {
        const articules = await ArticuleManager.read();
        res.status(200).json(articules);
    } catch (error) {
        return next(error);
    }
}

export const getArticuleById = async (req, res, next) => {
    try {
        const articule = await ArticuleManager.readOne(req.params.id);
        if (!articule) {
            return res.status(404).json({ message: 'Articulo no encontrado' });
        }
        res.status(200).json(articule);
    } catch (error) {
        return next(error);
    }
}

export const updateArticule = async (req, res, next) => {
    try {
        const updatedArticule = await ArticuleManager.update(req.params.id, req.body);
        if (!updatedArticule) {
            return res.status(404).json({ message: 'Articulo no encontrado' });
        }
        res.status(200).json(updatedArticule);
    } catch (error) {
        return next(error);
    }
}

export const deleteArticule = async (req, res, next) => {
    try {
        const deletedArticule = await ArticuleManager.destroy(req.params.id);
        if (!deletedArticule) {
            return res.status(404).json({ message: 'Articulo no encontrado' });
        }
        res.status(200).json({ message: 'Articulo eliminado con éxito' });
    } catch (error) {
        return next(error);
    }
}
