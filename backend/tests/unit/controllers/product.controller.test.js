const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { successfulFromService, notFoundFromService } = require('../mocks/product.mock');

chai.use(sinonChai);

describe('[PRODUCT.CONTROLLER]', function () {
  it('Product findProductById(req, res) - Passar resposta com sucesso', async function () {
    // Arrange
    sinon.stub(productService, 'findById').resolves(successfulFromService);
    const req = {
      params: { id: 3 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // Act
    await productController.findProductById(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(successfulFromService.data);
  });

  it('Product findProductById(req, res) - Passar resposta sem sucesso', async function () {
    // Arrange
    sinon.stub(productService, 'findById').resolves(notFoundFromService);
    const req = {
      params: { id: 99 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // Act
    await productController.findProductById(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(notFoundFromService.data);
  });

  it('Product update(req, res) - Passar resposta com sucesso', async function () {
    // Arrange
    const productServiceMock = { status: 'SUCCESSFUL', data: { id: 3, name: 'Capa do Batman' } };
    sinon.stub(productService, 'update').resolves(productServiceMock);
    const req = {
      params: { id: 3 },
      body: { name: 'Capa do Batman' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // Act
    await productController.update(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productServiceMock.data);
  });

  afterEach(function () {
    sinon.restore();
  });
});