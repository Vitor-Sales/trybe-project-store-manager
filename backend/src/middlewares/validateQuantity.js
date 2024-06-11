const mapStatusHTTP = require('../utils/mapStatusHTTP');

const validateQuantity = (req, res, next) => {
  const hasQuantityInAll = req.body.every((element) => 'quantity' in element);

  if (!hasQuantityInAll) {
    return res.status(mapStatusHTTP('BAD_REQUEST'))
      .json({ message: '"quantity" is required' });
  }

  const isAllQuantitiesBiggerThanZero = req.body.every((element) => element.quantity > 0);

  if (!isAllQuantitiesBiggerThanZero) {
    return res.status(mapStatusHTTP('INVALID_VALUE'))
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = validateQuantity;