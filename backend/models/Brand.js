const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const Product = require('./Product')

const Brand = sequelize.define('brand', {
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

Brand.hasMany(Product, { as: 'products', foreignKey: 'brandId' })

module.exports = Brand
