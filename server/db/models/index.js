const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')
const OrderHistory = require('./orderHistory')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

// User.belongsTo(Cart)
// Cart.hasMany(User)

// Product.belongsTo(Cart)
Cart.belongsTo(Product)
Cart.belongsTo(User)
OrderHistory.belongsTo(User)

module.exports = {
  User,
  Product,
  Cart,
  OrderHistory
}
