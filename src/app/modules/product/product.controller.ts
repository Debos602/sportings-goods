import { Request, Response } from 'express';
import { ProductServices } from './product.service';


const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: ProductData } = req.body;

    const result = await ProductServices.createProductIntoDB(ProductData);

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
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductFromDb();

    res.status(200).json({
      success: true,
      message: 'All Producs is retrieved Successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Someting gone wrong',
    });
  }
};

const getSingleProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.getSingleProductFromDB(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error('Error fetching product:', err);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the product',
    });
  }
};
const getCategoryProductById = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const results = await ProductServices.getCategoryProductFromDB(Number(categoryId));
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
const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.deleteProductById(productId);

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the product',
    });
  }
};

const updateProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
  

    const result = await ProductServices.updateProductById(
      productId,
      productData,
    );

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the product',
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProductById,
  getCategoryProductById,
  deleteProductById,
  updateProductById,
  
};
