const sinon = require('sinon');
const { expect } = require('chai');
const { saleService } = require('../../../src/services');
const { saleModel } = require('../../../src/models');
const {
  saleFromDB,
  successfulFromService,
  notFoundFromService,
} = require('../mocks/sale.mock');

describe('[SALE.SERVICE]', function () {
  it('Sale findById(id) - Listar todos os produtos com sucesso', async function () {
    // Arrange
    sinon.stub(saleModel, 'findById').resolves([saleFromDB]);
    // Act
    const sale = await saleService.findById(1);
    // Assert
    expect(sale).to.be.an('object');
    expect(sale.status).to.be.equal(successfulFromService.status);
    expect(sale.data).to.be.an('array');
    // expect(sale.data).to.be.equal(successfulFromService.data);
    // expect(sale.data.length).to.equal(2);
  });
  it('Sale findById(id) - Listar todos os produtos sem sucesso', async function () {
    // Arrange
    sinon.stub(saleModel, 'findById').resolves([]);
    // Act
    const sale = await saleService.findById(1);
    // Assert
    expect(sale).to.be.an('object');
    expect(sale.status).to.be.equal(notFoundFromService.status);
    expect(sale.data).to.be.deep.equal(notFoundFromService.data);
  });
  afterEach(function () {
    sinon.restore();
  });
});
