const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5),
});

const idSchema = Joi.number().integer().min(1);

// const saleSchema = Joi.object({

// })

module.exports = {
  productSchema,
  idSchema,
};