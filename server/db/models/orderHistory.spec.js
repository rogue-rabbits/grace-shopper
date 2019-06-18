const {expect} = require('chai')
const db = require('../index')
const OrderHistory = db.model('orderHistory')

describe('Order History model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  let orderHistory

  beforeEach(async () => {
    orderHistory = await OrderHistory.create({
      name: 'Tristan',
      price: 1000,
      quantity: 1,
      total: 1000,
      orderNumber: 1010
    })
  })

  describe('attributes definition', () => {
    it('has a customer name, price, quantity, total of order and order number', () => {
      expect(orderHistory.name).to.equal('Tristan')
      expect(orderHistory.price).to.equal('1000')
      expect(orderHistory.quantity).to.equal(1)
      expect(orderHistory.total).to.equal('1000')
      expect(orderHistory.orderNumber).to.equal(1010)
    })
    it('requires a customer', async () => {
      orderHistory.name = null
      let result
      let error
      try {
        result = await orderHistory.validate()
      } catch (err) {
        error = err
      }
      if (result) throw Error('validation should fail when content is null')
      expect(error).to.be.an.instanceOf(Error)
    })
    it('requires a price', async () => {
      orderHistory.price = null
      let result
      let error
      try {
        result = await orderHistory.validate()
      } catch (err) {
        error = err
      }
      if (result) throw Error('validation should fail when content is null')
      expect(error).to.be.an.instanceOf(Error)
    })

    it('requires a quantity', async () => {
      orderHistory.quantity = null
      let result
      let error
      try {
        result = await orderHistory.validate()
      } catch (err) {
        error = err
      }
      if (result) throw Error('validation should fail when content is null')
      expect(error).to.be.an.instanceOf(Error)
    })

    it('requires a total', async () => {
      orderHistory.total = null
      let result
      let error
      try {
        result = await orderHistory.validate()
      } catch (err) {
        error = err
      }
      if (result) throw Error('validation should fail when content is null')
      expect(error).to.be.an.instanceOf(Error)
    })
  })
})
