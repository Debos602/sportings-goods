import { Product } from './product.interface';
import ProductModel from './product.model';

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductFromDb = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.findOne({ _id: productId });
  return result;
};
const getCategoryProductFromDB = async (categoryId: number) => {
  const results = await ProductModel.find({ category_id: categoryId }).exec();
  return results;
};

const deleteProductById = async (productId: string) => {
  // console.log('database', productId);
  const result = await ProductModel.findByIdAndDelete({ _id: productId });
  return result;
};

const updateProductById = async (productId: string, productData: Product) => {
  const result = await ProductModel.findByIdAndUpdate(productId, productData, {
    new: true,
  });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDb,
  getSingleProductFromDB,
  deleteProductById,
  updateProductById,
  getCategoryProductFromDB
};
