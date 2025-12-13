import { Router } from "express";
import * as controller from "../controllers/products.controller.js"

const router = Router();

router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);
router.put('/:id', controller.updateProductById);
router.delete('/:id', controller.deleteProductById);
router.post('/create', controller.createProduct);

export default router;
