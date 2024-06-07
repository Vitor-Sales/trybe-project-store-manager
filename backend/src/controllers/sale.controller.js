const { saleService } = require('../services');

const findSaleById = async (req, res) => {
  const { id } = req.params;

  const sale = await saleService.findById(id);

  if (sale.status === 'NOT_FOUND') return res.status(404).json(sale.data);

  return res.status(200).json(sale.data);
};

module.exports = {
  findSaleById,
};