const router = require('express').Router()
const {OrderHistory, Cart} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    let newItem = await OrderHistory.create({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      total: req.body.total,
      orderNumber: req.body.orderNumber,
      userId: req.user.id
    })
    await Cart.destroy({
      where: {
        userId: req.user.id
      }
    })
    res.status(201).send(newItem)
  } catch (err) {
    next(err)
  }
})
