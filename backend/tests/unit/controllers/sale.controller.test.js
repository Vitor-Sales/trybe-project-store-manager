const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const { saleController } = require('../../../src/controllers');
const { saleService } = require('../../../src/services');

chai.use(sinonChai);

describe('[SALE.CONTROLLER', function () {
  it('Sale findBySaleId(req, res) - resposta com sucesso', async function () {
    // Arrange
    const serviceReturnMock = {
      status: 'SUCCESSFUL',
      data: [
        {
          date: '2024-06-11T23:00:54.000Z',
          productId: 1,
          quantity: 5,
        },
        {
          date: '2024-06-11T23:00:54.000Z',
          productId: 2,
          quantity: 10,
        },
      ],
    };
    sinon.stub(saleService, 'findById').resolves(serviceReturnMock);
    const req = { params: { id: 2 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // Act
    await saleController.findSaleById(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([
      {
        date: '2024-06-11T23:00:54.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        date: '2024-06-11T23:00:54.000Z',
        productId: 2,
        quantity: 10,
      },
    ]);
  });

  it('Sale findBySaleId(req, res) - resposta sem sucesso', async function () {
    // Arrange
    const serviceReturnMock = { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
    sinon.stub(saleService, 'findById').resolves(serviceReturnMock);
    const req = { params: { id: 999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // Act
    await saleController.findSaleById(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Sale insert(req, res) - resposta com sucesso', async function () {
    // Arrange
    const dataMock = {
      id: 3,
      itemsSold: [
        {
          productId: 3,
          quantity: 2,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };

    sinon.stub(saleService, 'insert').resolves({ status: 'CREATED', data: dataMock });
    const req = {
      body: [
        {
          productId: 3,
          quantity: 2,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // Act
    await saleController.insert(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(dataMock);
  });

  afterEach(function () {
    sinon.restore();
  });
});