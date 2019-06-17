const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

class Cart {
  constructor(oldCart) {
    this.products = oldCart ? oldCart.products : {}
    // this.totalQty = oldCart ? oldCart.totalQty : 0
    // this.totalPrice = oldCart ? oldCart.totalPrice : 0
  }

  add(product, id, quantity) {
    if (!this.products[id]) {
      // this.products[id].quantity++
      this.products[id] = {productId: id, quantity, product}
    } else {
      console.log('exists: ', this.products[id])
      this.products[id].quantity = this.products[id].quantity += quantity
    }

    // this.products[id].price =
    //   this.products[id].price * this.products[id].quantity
    // this.totalQty++
    // this.totalPrice += Number(product.price)
  }
  updateQuantity(product, id, quantity) {
    this.products[id].quantity = quantity
  }
}

router.get('/', (req, res, next) => {
  if (req.session.cart) {
    console.log(Object.values(req.session.cart.products))
    res.json(req.session.cart)
  } else {
    res.json({})
  }
})

router.post('/add-to-cart/', async (req, res, next) => {
  try {
    const id = req.body.id
    const quantity = req.body.quantity
    let cart
    if (req.session.cart) {
      cart = new Cart(req.session.cart)
    } else {
      cart = new Cart()
    }
    const product = await Product.findByPk(id)
    cart.add(product, id, quantity)
    req.session.cart = cart
    res.status(201).json(req.session.cart)
  } catch (error) {
    console.log(error)
  }
})

router.post('/update-quantity/', async (req, res, next) => {
  try {
    const id = req.body.id
    const quantity = req.body.quantity
    let cart = new Cart(req.session.cart)
    const product = await Product.findByPk(id)
    cart.updateQuantity(product, id, quantity)
    req.session.cart = cart
    res.status(201).json(req.session.cart)
  } catch (error) {
    console.log(error)
  }
})
