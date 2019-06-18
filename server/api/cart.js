const router = require('express').Router()
const {Cart, Product, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Cart.findAll({
        where: {
          userId: req.user.id
        },
        include: [{model: Product}, {model: User}]
      })
      res.json(cart)
    } else {
      res.json([])
    }
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

router.get('/copyGuestCart', async (req, res, next) => {
  try {
    let items = []
    for (let key in req.session.cart.products) {
      items.push(req.session.cart.products[key])
    }
    await Promise.all(
      items.map(async item => {
        //search database to see if user already has this product in his cart
        const found = await Cart.findOne({
          where: {
            productId: item.productId,
            userId: req.user.id
          }
        })
        //if not, add it to user's cart
        if (!found) {
          await Cart.create({
            productId: item.productId,
            quantity: item.quantity,
            userId: req.user.id
          })
        } else {
          //if yes, update current cart item's quantity
          await Cart.update(
            {quantity: found.dataValues.quantity + item.quantity},
            {
              where: {
                productId: item.productId,
                userId: req.user.id
              }
            }
          )
        }
      })
    )
    req.session.cart.products = {}
    res.status(201).send('created')
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
