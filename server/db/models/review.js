const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 3,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.STRING(1234),
    allowNull: false,
    defaultValue: 'Rating not available.',
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Review
