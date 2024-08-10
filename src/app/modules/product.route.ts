import { AllProductController } from './allProduct/allProducts.controller';
import express from 'express';

const router = express.Router();

router.post('/create-product', AllProductController.createProduct);

router.get('/all-product', AllProductController.getAllProductFromDb);
router.get('/all-product/:id', AllProductController.getAllSingleProductsFromDb);
router.get(
  '/category/:categoryId',
  AllProductController.getAllCategoryProductsFromDb,
);

router.patch('/all-product/:id', AllProductController.updateProductIntoDb);
router.delete('/all-product/:id', AllProductController.deleteProductFromDb);

export const ProductRoutes = router;
