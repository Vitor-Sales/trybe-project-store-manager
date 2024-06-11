const { productModel } = require('../models');
const schema = require('../validations/validationsInputValues');

const productExists = (product) => {
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESSFUL', data: product };
};

// const findById = async (productId) => {
//   const product = await productModel.findById(productId);
//   console.log(`productService: ${product}`);
//   if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
//   return { status: 'SUCCESSFUL', data: product };
// };

const findById = async (productId) => {
  const product = await productModel.findById(productId);
  // console.log(`productService: ${product}`);
  const validateProduct = productExists(product);

  return validateProduct;
};

const insert = async (productData) => {
  const error = schema.validateProduct(productData);

  if (error) return { status: error.status, data: { message: error.message } };

  const newProductId = await productModel.insert(productData.name);

  const newProduct = await productModel.findById(newProductId);

  return { status: 'CREATED', data: newProduct };
};

const update = async (productId, productNameData) => {
  const error = schema.validateProduct(productNameData);
  if (error) return { status: error.status, data: { message: error.message } };

  await productModel.update(productId, productNameData);

  const updatedProduct = await productModel.findById(productId);
  const validateProduct = productExists(updatedProduct);

  return validateProduct;
};

module.exports = {
  findById,
  insert,
  update,
};