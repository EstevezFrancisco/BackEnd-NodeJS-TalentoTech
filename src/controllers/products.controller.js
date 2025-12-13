import * as service from "../services/products.service.js"


// GET - /api/products?min_price=value&max_price=value
export const getProducts = async (req, res) => {
    const { min_price, max_price } = req.query;
    try {
        if (min_price && isNaN(parseFloat(min_price))) {
            return res.status(400).json({
                error: "El parámetro 'min_price' debe ser un número"
            });
        }

        if (max_price && isNaN(parseFloat(max_price))) {
            return res.status(400).json({
                error: "El parámetro 'max_price' debe ser un número"
            });
        }

        let products;
        if (min_price || max_price) {
            products = await service.filterProducts({ min_price, max_price });
        } else {
            products = await service.getProducts();
        }
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


// POST - /api/products/create
export const createProduct = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "El cuerpo de la solicitud está vacío" });
    }

    const { name, price } = req.body;

    if (name === undefined) {
        return res.status(422).json({ error: "El campo 'name' es requerido" });
    }

    if (price === undefined) {
        return res.status(422).json({ error: "El campo 'price' es requerido" });
    }

    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(422).json({
            error: "El campo 'name' debe ser un string no vacío"
        });
    }

    if (typeof price !== 'number' || isNaN(price)) {
        return res.status(422).json({
            error: "El campo 'price' debe ser un número válido"
        });
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


// PUT - /api/products/:id
export const updateProductById = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "El cuerpo de la solicitud está vacío" });
    }

    const { id } = req.params;
    const { name, price } = req.body;

    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(422).json({
            error: "El campo 'name' debe ser un string no vacío"
        });
    }

    if (typeof price !== 'number' || isNaN(price)) {
        return res.status(422).json({
            error: "El campo 'price' debe ser un número válido"
        });
    }

    try {
        const updatedProduct = await service.updateProductById(id, { name, price });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'No se encontró el producto' });
        }
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


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
