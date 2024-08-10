import { TAllProduct } from './allProducts.interface';
import AllProductModel from './allProducts.model';

const createProductIntoDB = async (product: TAllProduct) => {
  const result = await AllProductModel.create(product);
  return result;
};

const getAllProduct = async () => {
  const result = await AllProductModel.find();
  return result;
};

const getReletedProduct = async (categoryId: number) => {
  const result = await AllProductModel.find({
    category_id: categoryId,
  }).exec();
  return result;
};
const getSingleProduct = async (_id: string) => {
  const result = await AllProductModel.findOne({ _id: _id });
  return result;
};
const updateProduct = async (id: string, productData: TAllProduct) => {
  console.log(id, productData);
  const result = await AllProductModel.findByIdAndUpdate(
    id,
    { $set: productData },
    {
      new: true,
      runValidators: true,
    },
  );
  // console.log(result);
  return result;
};

const deleteProduct = async (id: string): Promise<TAllProduct | null> => {
  try {
    // Delete the product by ID
    const result = await AllProductModel.findByIdAndDelete(id);

    // Return the result of the deletion
    return result;
  } catch (err) {
    console.error('Error deleting product:', err);
    throw new Error('Product deletion failed');
  }
};

export const AllProductServices = {
  createProductIntoDB,
  getAllProduct,
  getReletedProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
