import * as model from "../models/product.model.js"

export async function getProducts() {
  const products = await model.getProducts();
  return products;
};

export async function filterProducts(filter) {
  const products = await model.filterProducts(filter);
  return products;
}

export async function createProduct(product) {
  if (product.price < 0) product.price = 0;
  const newProduct = await model.createProduct(product);
  return newProduct;
};

export async function getProductById(id) {
  const product = await model.getProductById(id);
  return product;
};

export async function updateProductById(id, productData) {
  if (productData.price < 0) productData.price = 0;
  const updatedProduct = await model.updateProductById(id, productData);
  return updatedProduct;
};

export async function deleteProductById(id) {
  const deleted = await model.deleteProductById(id);
  return deleted;
};
