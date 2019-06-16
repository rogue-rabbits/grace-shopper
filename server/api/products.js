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
