const { productModel } = require('../models');

const findById = async (productId) => {
  const product = await productModel.findById(productId);
  console.log(`productService: ${product}`);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
  findById,
};