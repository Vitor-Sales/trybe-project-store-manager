const { saleModel } = require('../models');
const { productSaleModel, productModel } = require('../models');

const productsExists = async (saleData) => {
  const allProductsExists = await Promise
    .all(saleData
      .map((element) => productModel
        .findById(element.productId)));

  return allProductsExists.includes(undefined);
};

const findById = async (saleId) => {
  const sale = await saleModel.findById(saleId);

  if (sale.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

  return { status: 'SUCCESSFUL', data: sale };
};

const insert = async (saleData) => {
  const allProductsExists = await productsExists(saleData);
  if (allProductsExists) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  const newSaleId = await saleModel.insert();
  const itemsSold = await productSaleModel.insert(newSaleId, saleData);

  return { status: 'CREATED', data: { id: newSaleId, itemsSold } };
};

module.exports = {
  findById,
  insert,
};