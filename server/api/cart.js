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

router.post('/', async (req, res, next) => {
  try {
    const newCartItem = await Cart.create({
      productId: req.body.productId,
      quantity: req.body.quantity,
      userId: req.body.userId
    })
    res.status(201).json(newCartItem)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const [numRows, updatedCart] = await Cart.update(
      {quantity: req.body.quantity},
      {
        where: {
          productId: req.body.productId,
          userId: req.body.userId
        },
        returning: true,
        plain: true
      }
    )
    if (updatedCart) {
      res.send(updatedCart)
    } else {
      res.status(404).send('updated cart not found')
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    await Cart.destroy({
      where: {
        productId: req.params.productId,
        userId: req.user.id
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
