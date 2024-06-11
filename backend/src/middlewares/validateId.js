const mapStatusHTTP = require('../utils/mapStatusHTTP');

const validateId = (req, res, next) => {
  const isIdinBody = 'id' in req.body;
  if (!isIdinBody) {
    return res.status(mapStatusHTTP('BAD_REQUEST')).json({ message: '"productId" is required' });
  }

  const { id } = req.body;
  if (id === !id) {
    return res.status(mapStatusHTTP('BAD_REQUEST'))
      .json({ message: '"productId" is required' });
  }
  next();
};

module.exports = validateId;