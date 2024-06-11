const { productService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findProductById = async (req, res) => {
  const { id } = req.params;

  const product = await productService.findById(id);

  if (product.status === 'NOT_FOUND') return res.status(404).json(product.data);

  return res.status(200).json(product.data);
};

// const insert = async (req, res) => {
//   const productData = req.body;
//   console.log(productData);

//   const serviceResponse = await productService.insert(productData);

//   if (serviceResponse.status === 'NOT_FOUND') return res.status(404).json(serviceResponse.data);
//   if (serviceResponse.status === 'BAD_REQUEST') return res.status(400).json(serviceResponse.data);
//   if (serviceResponse.status === 'INVALID_VALUE') return res.status(422).json(serviceResponse.data);

//   return res.status(201).json(serviceResponse.data);
// };

const insert = async (req, res) => {
  const productData = req.body;

  const { status, data } = await productService.insert(productData);

  return res.status(mapStatusHTTP(status)).json(data);
};

const update = async (req, res) => {
  const name = req.body;
  const { id } = req.params;

  const { status, data } = await productService.update(id, name);

  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await productService.deleteProduct(id);

  if (status === 'NOT_FOUND') return res.status(mapStatusHTTP(status)).json(data);

  return res.status(mapStatusHTTP(status)).json();
};

module.exports = {
  findProductById,
  insert,
  update,
  deleteProduct,
};