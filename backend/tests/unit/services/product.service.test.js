const sinon = require('sinon');
const { expect } = require('chai');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { productFromModel } = require('../mocks/product.mock');

describe('[PRODUCT.SERVICE]', function () {
  it('Product findById(id) - Listar produto com sucesso', async function () {
    // Arrange
    sinon.stub(productModel, 'findById').resolves(productFromModel);

    const productId = 3;
    // Act
    const responseService = await productService.findById(productId);

    // Assert
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.equal(productFromModel);
  });

  it('Product findById(id) - Listar produto sem sucesso', async function () {
    // Arrange
    sinon.stub(productModel, 'findById').resolves(null);
    const productId = 999;
    // Act
    const responseService = await productService.findById(productId);
    // Assert
    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});