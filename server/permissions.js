const deny = next => {
  const err = new Error('ACCESS DENIED!')
  err.status = 401
  next(err)
}

const _isLoggedIn = req => !!req.user

const _isAdmin = req => req.user.isAdmin

module.exports = {
  isLoggedIn(req, res, next) {
    _isLoggedIn(req) ? next() : deny(next)
  },

  isAdmin(req, res, next) {
    _isLoggedIn(req) && _isAdmin(req) ? next() : deny(next)
  }
}
