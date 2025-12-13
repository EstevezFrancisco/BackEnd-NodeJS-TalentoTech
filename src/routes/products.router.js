import { Router } from "express";
import * as controller from "../controllers/products.controller.js"

const router = Router();

router.get('/', controller.getProducts);
router.post('/create', controller.createProduct);
router.get('/:id', controller.getProductById);
router.put('/:id', controller.updateProductById);
router.delete('/:id', controller.deleteProductById);

export default router;
