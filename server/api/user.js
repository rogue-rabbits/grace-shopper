const router = require('express').Router()
const {isAdmin, isSelf} = require('../permissions')
const {User} = require('../db/models/user')

module.exports = router

router.get('/', (req, res, next) => {
  res.json(req.user)
})
