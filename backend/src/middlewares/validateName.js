const mapStatusHTTP = require('../utils/mapStatusHTTP');

const validateName = (req, res, next) => {
  const isNameInBody = 'name' in req.body;
  if (!(isNameInBody)) {
    return res.status(mapStatusHTTP('BAD_REQUEST')).json({ message: '"name" is required' });
  }

  const { name } = req.body;

  if (name === !name || '') {
    return res.status(mapStatusHTTP('BAD_REQUEST')).json({ message: '"name" is required' });
  }

  next();
};

module.exports = validateName;