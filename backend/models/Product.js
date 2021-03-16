const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Product = sequelize.define('product', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  userId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
}, { timestamps: true })

module.exports = Product
