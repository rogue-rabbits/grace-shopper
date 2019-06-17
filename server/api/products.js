const router = require('express').Router()
const {Product, Review, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id, {
      include: [{model: Review, include: [{model: User}]}]
    })
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/review', async (req, res, next) => {
  try {
    const creatReview = await Review.create({
      userId: req.user.id,
      productId: req.params.id,
      description: req.body.message,
      rating: req.body.rating
    })
    const objectToSend = {
      id: creatReview.id,
      user: req.user,
      userId: req.user.id,
      productId: req.params.id,
      description: req.body.message,
      rating: req.body.rating
    }
    res.json(objectToSend)
  } catch (err) {
    next(err)
  }
})
