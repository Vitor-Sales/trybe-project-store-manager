const connection = require('./connection');

const insert = async (saleId, saleData) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)';
  const itemsSold = [];
  // 5.3 Promise.all

  await Promise.all(saleData.map(async (product) => {
    const { productId, quantity } = product;
    itemsSold.push({ productId, quantity });
    await connection.execute(query, [saleId, productId, quantity]);
    // return item;
  }));
  console.log(itemsSold);

  return itemsSold;
};

module.exports = {
  insert,
};