const express = require('express');
require('express-async-errors');
const { productModel, saleModel } = require('./models');
// const { productService } = require('./services');
const { productController } = require('./controllers');
const { saleController } = require('./controllers');
const validateName = require('./middlewares/validateName');
// const { productRoutes } = require('./routes');

const app = express();
app.use(express.json());
// app.use('/products', productRoutes);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', async (_req, res) => {
  const products = await productModel.findAll();

  return res.status(200).json(products);
});

app.post('/products', validateName, productController.insert);

app.get('/products/:id', productController.findProductById);

app.put('/products/:id', productController.update);

app.get('/sales', async (req, res) => {
  const sales = await saleModel.findAll();
  return res.status(200).json(sales);
});

app.post('/sales', saleController.insert);

app.get('/sales/:id', saleController.findSaleById);

app.use((error, _req, res, _next) => res.status(500).json({ error: error.message }));

module.exports = app;
