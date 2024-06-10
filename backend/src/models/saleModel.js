const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const query = `SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity FROM sales_products AS sp
  INNER JOIN sales AS sa ON sp.sale_id = sa.id 
  ORDER BY sale_id, product_id`;
  const [sales] = await connection.execute(query);
  return camelize(sales);
};

const findById = async (saleId) => {
  const query = `SELECT sa.date, sp.product_id, sp.quantity FROM sales_products AS sp 
  INNER JOIN sales AS sa ON sp.sale_id = sa.id
  WHERE sale_id = ?`;
  const [sale] = await connection.execute(query, [saleId]);
  return camelize(sale);
};

const insert = async () => {
  const query = 'INSERT INTO sales (date) VALUE(NOW())';
  const [{ insertId }] = await connection.execute(query);

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};