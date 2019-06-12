const router = require('express').Router()
const {Cart, Product, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {
        userId: req.user.id
      },
      include: [{model: Product}, {model: User}]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
