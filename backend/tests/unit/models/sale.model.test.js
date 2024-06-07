const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const { saleModel } = require('../../../src/models');

const {
  allSalesFromDB,
  saleFromDB,
} = require('../mocks/sale.mock');

describe('[SALE.MODEL]', function () {
  it('Sale findAll() - Listar todas as vendas', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([allSalesFromDB]);
    // Act
    const sales = await saleModel.findAll();
    // Assert
    expect(sales).to.be.an('array');
    expect(sales.length).to.be.equal(3);
  });

  it('Sale findById(id) - Listar venda pelo ID', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([saleFromDB]);
    const saleId = 1;
    // Act
    const sale = await saleModel.findById(saleId);
    // Assert
    expect(sale).to.be.an('array');
  });

  afterEach(function () {
    sinon.restore();
  });
});