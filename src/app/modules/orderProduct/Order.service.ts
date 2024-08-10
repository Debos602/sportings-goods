// src/services/Order.service.ts

import { TOrder } from './Order.interface';
import OrderModel from './Order.model';

const createOrder = async (orderData: TOrder) => {
  try {
    const result = await OrderModel.create(orderData);
    return result;
  } catch (error) {
    console.error('Error creating order:', error); // Log the error for debugging
    throw error; // Re-throw the error for controller to catch
  }
};

export const OrderService = {
  createOrder,
};
