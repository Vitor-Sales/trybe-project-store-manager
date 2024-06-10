const { productSchema } = require('./schemas');

const validateProduct = (productName) => {
  const { error } = productSchema.validate(productName);

  if (error) {
    return { status: 'INVALID_VALUE', message: error.message };
  }
};

module.exports = {
  validateProduct,
};