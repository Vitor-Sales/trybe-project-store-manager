const allProductsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const productFromDB = { id: 3, name: 'Escudo do Capitão América' };
const productFromModel = { id: 3, name: 'Escudo do Capitão América' };

const successfulFromService = {
  status: 'SUCCESSFUL',
  data: { id: 3, name: 'Escudo do Capitão América' },
};
const notFoundFromService = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

module.exports = {
  allProductsFromDB,
  productFromDB,
  productFromModel,
  successfulFromService,
  notFoundFromService,
};