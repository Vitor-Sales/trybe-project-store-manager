const mapStatusHTTP = require('../utils/mapStatusHTTP');

const validateId = (req, res, next) => {
  const hasProductIdInAll = req.body.every((element) => 'productId' in element);
  if (!hasProductIdInAll) {
    return res.status(mapStatusHTTP('BAD_REQUEST')).json({ message: '"productId" is required' });
  }

  next();
};

module.exports = validateId;