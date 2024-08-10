import express from 'express';
import { OrderController } from './orderProduct/Order.controller';

const router = express.Router();

router.post('/orders', OrderController.createOrderInDb);

export const OrderRoutes = router;
