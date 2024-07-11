import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/create-product', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProducts);
router.get('/:productId', ProductControllers.getSingleProductById);
router.get('/category/:categoryId', ProductControllers.getCategoryProductById);
router.put('/:productId', ProductControllers.updateProductById);
router.delete('/:productId', ProductControllers.deleteProductById);

export const ProductRoutes = router;
