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

  it('Product insert(req, res) - resposta com sucesso', async function () {
    // Arrange
    const productServiceReturnMock = { status: 'CREATED', data: { id: 4, name: 'Batman' } };
    sinon.stub(productService, 'insert').resolves(productServiceReturnMock);

    const req = { body: { name: 'Batman' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // Act
    await productController.insert(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 4, name: 'Batman' });
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

  // it('Product update(req, res) - Passar resposta sem sucesso - Campo "name" inexistente', async function () {
  //   // Arrange
  //   // const productServiceMock = { status: 'SUCCESSFUL', data: { id: 3, name: 'Capa do Batman' } };
  //   // sinon.stub(productService, 'update').resolves(productServiceMock);
  //   const req = {
  //     params: { id: 3 },
  //     body: {},
  //   };

  //   const res = {
  //     status: sinon.stub().returnsThis(),
  //     json: sinon.stub(),
  //   };
  //   // Act
  //   await productController.update(req, res);
  //   // Assert
  //   expect(res.status).to.have.been.calledWith(400);
  //   // expect(res.json).to.have.been.calledWith(productServiceMock.data);
  // });

  it('Product deleteProduct(req, res) - resposta com sucesso', async function () {
    // Arrange
    sinon.stub(productService, 'deleteProduct').resolves({ status: 'NO_CONTENT' });
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // Act
    await productController.deleteProduct(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(204);
  });

  it('Product deleteProduct(req, res) - resposta sem sucesso - produto  inexistente', async function () {
    // Arrange
    sinon.stub(productService, 'deleteProduct').resolves({ status: 'NOT_FOUND' });
    const req = { params: { id: 900 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // Act
    await productController.deleteProduct(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(404);
    // expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});