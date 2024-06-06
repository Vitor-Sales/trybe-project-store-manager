const { productService } = require('../services');

const findProductById = async (req, res) => {
  const { id } = req.params;

  const product = await productService.findById(id);

  if (product.status === 'NOT_FOUND') return res.status(404).json(product.data);

  return res.status(200).json(product.data);
};

module.exports = {
  findProductById,
};