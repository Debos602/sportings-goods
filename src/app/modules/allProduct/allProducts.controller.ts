import { Request, Response } from 'express';
import { AllProductServices } from './allProducts.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: ProductData } = req.body;
    console.log(ProductData);
    const result = await AllProductServices.createProductIntoDB(ProductData);

    res.status(200).json({
      success: true,
      message: 'Product is created Successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the product',
    });
  }
};
const getAllProductFromDb = async (req: Request, res: Response) => {
  try {
    const result = await AllProductServices.getAllProduct();

    res.status(200).json({
      success: true,
      message: 'All Products are retrieved Successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the product',
    });
  }
};
const getAllCategoryProductsFromDb = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const results = await AllProductServices.getReletedProduct(
      Number(categoryId),
    );
    if (!results || results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Products not found for the given category id',
      });
    }

    return res.status(200).json({
      success: true,
      data: results,
    });
  } catch (err) {
    console.error('Error fetching products by category id:', err);
    return res.status(500).json({
      success: false,
      message: 'Error fetching products by category id',
    });
  }
};
const getAllSingleProductsFromDb = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const results = await AllProductServices.getSingleProduct(id);

    return res.status(200).json({
      success: true,
      data: results,
    });
  } catch (err) {
    console.error('Error fetching products by category id:', err);
    return res.status(500).json({
      success: false,
      message: 'Error fetching products by category id',
    });
  }
};

const updateProductIntoDb = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productData = req.body;

    const result = await AllProductServices.updateProduct(id, productData);
    // console.log(result);
    res.status(200).json({
      success: true,
      message: 'Stock updated successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: 'Something wrong!',
      error: err,
    });
  }
};

const deleteProductFromDb = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Extract product ID from the request parameters

    // Call the service method to delete the product
    const result = await AllProductServices.deleteProduct(id);

    // Check if the result indicates a successful deletion
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (err) {
    // Handle any errors that occurred during the deletion
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
  }
};

export const AllProductController = {
  createProduct,
  getAllProductFromDb,
  getAllCategoryProductsFromDb,
  getAllSingleProductsFromDb,
  updateProductIntoDb,

  deleteProductFromDb,
};
