const {expect} = require('chai')
const db = require('../index')
const Cart = db.model('cart')
const User = db.model('user')
const Product = db.model('product')

describe('Cart model', async () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  let cart
  let product
  let user
  beforeEach(async () => {
    product = await Product.create({
      name: 'Matcha',
      type: 'Tea',
      price: 4000,
      quantity: 10,
      description: 'the most delicious tea in mankind'
    })

    user = await User.create({
      email: 'cobby@puppybook.com',
      password: 'comon',
      address1: '7819 Web Dr',
      isAdmin: true
    })

    cart = await Cart.create({
      productId: product.id,
      quantity: 2,
      userId: user.id
    })
  })

  describe('attributes definition', () => {
    it('has a productId, quantity and userId', () => {
      expect(cart.productId).to.equal(product.id)
      expect(cart.quantity).to.equal(2)
      expect(cart.userId).to.equal(user.id)
    })
    it('requires quantity', async () => {
      cart.quantity = null

      let result
      let error
      try {
        result = await cart.validate()
      } catch (err) {
        error = err
      }
      if (result) throw Error('validation should fail when content is null')
      expect(error).to.be.an.instanceOf(Error)
    })
    it('has an associated productId', async () => {
      cart.productId = null

      let result
      let error
      try {
        result = await cart.validate()
      } catch (err) {
        error = err
      }
      if (result) throw Error('validation should fail when content is null')
      expect(error).to.be.an.instanceOf(Error)
    })

    it('has an associated userId', async () => {
      cart.userId = null

      let result
      let error
      try {
        result = await cart.validate()
      } catch (err) {
        error = err
      }
      if (result) throw Error('validation should fail when content is null')
      expect(error).to.be.an.instanceOf(Error)
    })
  })
})
