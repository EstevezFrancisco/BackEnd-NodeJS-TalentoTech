import * as service from "../services/products.service.js"


// GET - /api/products/
export const getAllProducts = async (req, res) => {
    try {
        const products = await service.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


// GET - /api/products/:id
export const getProductById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Se requiere el ID del producto" });
    }

    try {
        const product = await service.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: "No se encontró el producto" });
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


// DELETE - /api/products/:id
export const deleteProductById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Se requiere el ID del producto" });
    }

    try {
        const deleted = await service.deleteProductById(id);
        if (!deleted) {
            return res.status(404).json({ error: "No se encontró el producto" });
        }
        res.status(200).json({ message: "Producto eliminado" });

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


// POST - /api/products/create
export const createProduct = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "No se proporcionaron datos para crear" });
    }

    const { name, price } = req.body || {};
    if (!name || !price) {
        return res.status(422).json({ error: "Se requiere nombre y precio del producto" });
    }

    try {
        const newProduct = await service.createProduct({ name, price });
        if (!newProduct) {
            return res.status(400).json({ error: "No se pudo crear el producto. Verificar los datos" });
        }
        res.status(201).json(newProduct);

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


// PUT - /api/products/:id
export const updateProductById = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "No se proporcionaron datos para actualizar" });
    }

    const { id } = req.params;
    const productData = req.body;

    try {
        const updatedProduct = await service.updateProductById(id, productData);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'No se encontró el producto' });
        }

        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
