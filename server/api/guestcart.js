const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

class Cart {
  constructor(oldCart) {
    this.products = oldCart ? oldCart.products : {}
  }

  add(product, id, quantity) {
    //if this product isnt already in the cart, create it
    if (!this.products[id]) {
      this.products[id] = {productId: id, quantity, product}
    } else {
      //if product is already in cart, update its quantity
      this.products[id].quantity = this.products[id].quantity += quantity
    }
  }
  updateQuantity(product, id, quantity) {
    this.products[id].quantity = quantity
  }
  delete(id) {
    let products = {}

    for (let productId in this.products) {
      if (productId === id) {
        continue
      } else {
        products[productId] = this.products[productId]
      }
    }
    this.products = products
  }
}

router.get('/', (req, res, next) => {
  if (req.session.cart) {
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

router.get('/deleteItem/:id', (req, res, next) => {
  try {
    const id = req.params.id
    let cart = new Cart(req.session.cart)
    cart.delete(id)
    req.session.cart = cart
    res.status(201).json(req.session.cart)
  } catch (error) {
    console.log(error)
  }
})
