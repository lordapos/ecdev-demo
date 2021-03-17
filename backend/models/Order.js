const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Order = sequelize.define('order', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },
  userId: {
    allowNull: false,
    type: Sequelize.INTEGER
  },
  orderItems: {
    allowNull: false,
    type: Sequelize.TEXT
  },
  shippingAddress: {
    allowNull: false,
    type: Sequelize.TEXT
  },
  paymentMethod: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  paymentResult: {
    allowNull: true,
    type: Sequelize.TEXT,
    defaultValue: 'Waiting for payment'
  },
  shippingPrice: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0.0
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0.0
  },
  isPaid: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  paidAt: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  isDelivered: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  deliveredAt: {
    allowNull: true,
    type: Sequelize.STRING,
  },

}, { timestamps: true })

module.exports = Order