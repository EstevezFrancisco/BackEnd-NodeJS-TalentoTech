import * as model from "../models/product.model.js"

export async function getAllProducts() {
  const products = await model.getAllProducts();
  return products;
};

export async function getProductById(id) {
  const product = await model.getProductById(id);
  return product;
};

export async function deleteProductById(id) {
  const deleted = await model.deleteProductById(id);
  return deleted;
};

export async function createProduct(product) {
  if (product.price < 0) product.price = 0;
  const newProduct = await model.createProduct(product);
  return newProduct;
};

export const updateProductById = async (id, productData) => {
    const updatedProduct = await model.updateProductById(id, productData);
    return updatedProduct;
};