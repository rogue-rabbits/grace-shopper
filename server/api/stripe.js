const stripe = require('stripe')('sk_test_6d6w4ord2uPAphZ975Csqg1Z003AikNapl')
const router = require('express').Router()

router.post('/charge', async (req, res, next) => {
  try {
    let amount = req.body.amount
    let data = await stripe.charges.create({
      amount: amount,
      currency: 'usd',
      description: 'An example charge',
      source: req.body.body
    })

    res.json(data)
  } catch (err) {
    next(err)
  }
})

module.exports = router
