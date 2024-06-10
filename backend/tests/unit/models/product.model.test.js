// const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const {
  allProductsFromDB,
  productFromDB,
  productFromModel,
} = require('../mocks/product.mock');

describe('[PRODUCT.MODEL]', function () {
  it('Product findAll() - Listar todos os produtos com sucesso.', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([allProductsFromDB]);
    // Act
    const products = await productModel.findAll();
    // Assert
    expect(products).to.be.an('array');
  });

  it('Product findById(id) - Listar produto com sucesso', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);
    const productId = 3;

    // Act
    const product = await productModel.findById(productId);
    // Assert

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productFromModel);
  });

  // Teste se findById(id) nao houver resultados

  it('Product insert(productName)', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    const nameMock = 'Raio de Zeus';
    // Act
    const insertId = await productModel.insert(nameMock);
    // Assert
    expect(insertId).to.be.equal(4);
  });

  afterEach(function () {
    sinon.restore();
  });
});
