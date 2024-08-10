import mongoose, { Schema } from 'mongoose';
import { TOrder } from './Order.interface';

// Define the OrderItem schema
const orderItemSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

// Define the UserDetails schema
const userDetailsSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Credit Card', 'PayPal'],
    required: true,
  },
});

// Define the Order schema
const orderSchema = new Schema<TOrder>({
  items: [orderItemSchema],
  totalPriceWithVAT: { type: Number, required: true },
  userDetails: userDetailsSchema,
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    required: true,
  },
});

// Create and export the model
const OrderModel = mongoose.model<TOrder>('Order', orderSchema);

export default OrderModel;
