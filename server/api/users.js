const router = require('express').Router()
const {User, Cart} = require('../db/models')
const {isAdmin} = require('../permissions')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {id: req.params.userId}
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})
router.delete('/:userId', async (req, res, next) => {
  try {
    const userToDelete = await User.findByPk(req.params.userId)
    const cartToDelete = await Cart.findOne({
      where: {
        userId: req.params.userId
      }
    })

    if (cartToDelete) {
      await cartToDelete.destroy()
    }
    await userToDelete.destroy()
    res.sendStatus(204)
  } catch (err) {
    console.log(req.params)
    next(err)
  }
})

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'email',
        'firstName',
        'lastName',
        'address1',
        'state',
        'zipCode',
        'isAdmin'
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
