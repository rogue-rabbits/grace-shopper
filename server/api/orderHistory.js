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

router.get('/lastOrder', async (req, res, next) => {
  try {
    const orderNumber = await OrderHistory.findAll({
      limit: 1,
      // where: {
      //your where conditions, or without them if you need ANY entry
      // },
      order: [['orderNumber', 'DESC']]
    })
    res.json(orderNumber)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await OrderHistory.findAll({
        where: {
          userId: req.user.id
        }
      })
      res.json(order)
    } else {
      res.send('user not logged in')
    }
  } catch (err) {
    next(err)
  }
})
