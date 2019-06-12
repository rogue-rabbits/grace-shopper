const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

class Cart {
  constructor(oldCart) {
    this.products = oldCart ? oldCart.products : {}
    // this.totalQty = oldCart ? oldCart.totalQty : 0
    // this.totalPrice = oldCart ? oldCart.totalPrice : 0
  }

  add(product, id) {
    if (!this.products[id]) {
      // this.products[id].quantity++
      this.products[id] = {productId: id, quantity: 0}
    }

    this.products[id].quantity++
    // this.products[id].price =
    //   this.products[id].price * this.products[id].quantity
    // this.totalQty++
    // this.totalPrice += Number(product.price)
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

router.get('/add-to-cart/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    let cart
    if (req.session.cart) {
      cart = new Cart(req.session.cart)
    } else {
      cart = new Cart()
    }
    const product = await Product.findByPk(id)
    cart.add(product, id)
    req.session.cart = cart
    res.redirect('/api/guestcart')
  } catch (error) {
    console.log(error)
  }
})
