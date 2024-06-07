const connection = require('./connection');

const findAll = async () => {
  const query = 'SELECT * FROM products';
  const [products] = await connection.execute(query);
  // console.log(products);
  return products;
};

const findById = async (productId) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[product]] = await connection.execute(query, [productId]);
  return product;
};

module.exports = {
  findAll,
  findById,
};