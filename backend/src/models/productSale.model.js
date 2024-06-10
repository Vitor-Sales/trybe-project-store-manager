const connection = require('./connection');

const insert = async (saleId, saleData) => {
  const query = 'INSERT INTO sale_id, product_id, quantity VALUE (?, ?, ?)';
  const itemsSold = [];
  saleData.forEach(async (product) => {
    const { productId, quantity } = product;
    itemsSold.push({ productId, quantity });
    await connection.execute(query, [saleId, productId, quantity]);
  });
  return itemsSold;
};

module.exports = {
  insert,
};