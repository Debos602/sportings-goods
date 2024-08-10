import { Request, Response } from 'express';
import OrderModel from './Order.model';

const createOrderInDb = async (req: Request, res: Response) => {
  try {
    // Extract fields from the request body
    const { items, totalPriceWithVAT, userDetails, status } = req.body;

    // Validate required fields
    if (!items || !totalPriceWithVAT || !userDetails) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate the status field
    const validStatuses = ['Pending', 'Completed', 'Cancelled'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Validate the paymentMethod field
    const validPaymentMethods = ['Cash', 'Credit Card', 'PayPal'];
    if (
      userDetails.paymentMethod &&
      !validPaymentMethods.includes(userDetails.paymentMethod)
    ) {
      return res.status(400).json({ message: 'Invalid payment method' });
    }

    // Create a new order instance with the provided data
    const newOrder = new OrderModel({
      items,
      totalPriceWithVAT,
      userDetails,
      status, // Optional field
    });

    // Save the new order to the database
    const savedOrder = await newOrder.save();
    res.status(200).json({
      success: true,
      message: 'Order is created Successfully',
      data: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the product',
    });
  }
};

export const OrderController = { createOrderInDb };
