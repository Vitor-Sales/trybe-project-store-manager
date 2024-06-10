const sinon = require('sinon');
const { expect } = require('chai');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { productFromModel } = require('../mocks/product.mock');
const schema = require('../../../src/validations/validationsInputValues');

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

  it('Product insert(productName) - se a criação do produto for um sucesso', async function () {
    // Arrange
    sinon.stub(productModel, 'insert').resolves(3);
    sinon.stub(productModel, 'findById').resolves(productFromModel);
    const productNameMock = { name: 'Escudo do Capitão América' };
    // Act
    const responseService = await productService.insert(productNameMock);

    // Assert
    expect(responseService.status).to.be.equal('CREATED');
    expect(responseService.data).to.be.deep.equal(productFromModel);
  });

  it('Product insert(productName) - falhar pelo valor de name ter menos de 5 caracteres', async function () {
    // Arrange
    // sinon.stub(schema, 'validateProduct').resolves({ status: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });
    const productNameMock = { name: 'Faca' };
    // Act
    const responseService = await productService.insert(productNameMock);
    // Assert
    expect(responseService.status).to.be.equal('INVALID_VALUE');
    expect(responseService.data).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });

  afterEach(function () {
    sinon.restore();
  });
});