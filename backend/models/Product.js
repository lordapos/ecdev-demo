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
    type: Sequelize.JSON,
    allowNull: false,
  },
  sku: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  youtubeEmbed  : {
    type: Sequelize.STRING,
    allowNull: false,
  },
  highlights: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  specs: {
    type: Sequelize.JSON,
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
  brandId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  rating: {
    allowNull: true,
    type: Sequelize.INTEGER,
  },
  numReviews: {
    allowNull: true,
    type: Sequelize.INTEGER,
  }
}, { timestamps: true })

module.exports = Product
