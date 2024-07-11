import mongoose, { Schema } from 'mongoose';
import { Product } from './product.interface';

const ProductSchema: Schema = new Schema<Product>({
  name: { type: String, required: true },
  category_id: { type: Number, required: true },
  stock: { type: Number, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});



const ProductModel = mongoose.model<Product>('Product', ProductSchema);

export default ProductModel;
