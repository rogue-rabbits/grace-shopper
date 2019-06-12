const Sequelize = require('sequelize')
const db = require('../db')

const OrderHistory = db.define('orderHistory', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  total: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  orderNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = OrderHistory
