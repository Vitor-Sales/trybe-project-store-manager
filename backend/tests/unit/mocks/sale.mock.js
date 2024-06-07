const allSalesFromDB = [
  {
    saleId: 1,
    date: '2024-06-07T23:14:28.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2024-06-07T23:14:28.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2024-06-07T23:14:28.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleFromDB = [
  {
    date: '2024-06-07T23:21:48.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2024-06-07T23:21:48.000Z',
    productId: 2,
    quantity: 10,
  },
];

const successfulFromService = {
  status: 'SUCCESSFUL',
  data: [
    {
      date: '2024-06-07T23:21:48.000Z',
      productId: 1,
      quantity: 5,
    },
    {
      date: '2024-06-07T23:21:48.000Z',
      productId: 2,
      quantity: 10,
    },
  ],
};
const notFoundFromService = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};

module.exports = {
  allSalesFromDB,
  saleFromDB,
  successfulFromService,
  notFoundFromService,
};