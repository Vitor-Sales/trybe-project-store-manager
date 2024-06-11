const { saleService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findSaleById = async (req, res) => {
  const { id } = req.params;

  const sale = await saleService.findById(id);

  if (sale.status === 'NOT_FOUND') return res.status(404).json(sale.data);

  return res.status(200).json(sale.data);
};

const insert = async (req, res) => {
  const saleData = req.body;

  const { status, data } = await saleService.insert(saleData);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findSaleById,
  insert,
}; 