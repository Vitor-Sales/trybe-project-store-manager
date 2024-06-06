const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { allProductsFromDB } = require('../mocks/product.mock');

describe('[MODEL] - Testando acesso ao Banco de Dados', function () {
  it('Product - Listar todos os produtos com sucesso.', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([allProductsFromDB]);
    // Act
    const products = await productModel.findAll();
    // Assert
    expect(products).to.be.an('array');
  });
});
