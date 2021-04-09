const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const Product = require('./Product')

const Category = sequelize.define('category', {
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
}, { timestamps: false })

Category.hasMany(Product, { as: 'products', foreignKey: 'categoryId' })

module.exports = Category