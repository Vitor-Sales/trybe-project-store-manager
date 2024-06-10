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

const insert = async (productName) => {
  // console.log(productName);
  const query = 'INSERT INTO products (name) VALUE (?)';
  const [{ insertId }] = await connection.execute(query, [productName]);
  // console.log(insertId);
  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};