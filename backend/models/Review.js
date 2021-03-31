const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Review = sequelize.define('review', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  review: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },

  productId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },

}, { timestamps: true })


module.exports = Review
