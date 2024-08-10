import mongoose, { Schema } from 'mongoose';
import { TAllProduct } from './allProducts.interface';

const ProductSchema: Schema = new Schema<TAllProduct>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  category_id: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const AllProductModel = mongoose.model<TAllProduct>(
  'AllProduct',
  ProductSchema,
);

export default AllProductModel;
