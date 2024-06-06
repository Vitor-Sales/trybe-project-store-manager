const express = require('express');
require('express-async-errors');
const { productModel } = require('./models');
// const { productService } = require('./services');
const { productController } = require('./controllers');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', async (_req, res) => {
  const products = await productModel.findAll();

  return res.status(200).json(products);
});

// app.get('/products/:id', async (req, res) => {
//   const { id } = req.params;

//   const product = await productService.findById(id);

//   return res.status(200).json(product);
// });

app.get('/products/:id', productController.findProductById);

app.use((error, _req, res, _next) => res.status(500).json({ error: error.message }));

module.exports = app;
