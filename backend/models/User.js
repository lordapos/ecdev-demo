const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const { hooks } = require('./user-role.hook')
const Role = require('./Role')
const UserRole = require('./UserRole')
const Product = require('./Product')
const Order = require('./Order')

const User = sequelize.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Must be a valid email address',
      },
    },
  },
  password: {
    type: Sequelize.CHAR,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, { hooks })

User.belongsToMany(Role, {
  hooks: true,
  through: UserRole,
})

User.hasMany(Product, { as: 'products', foreignKey: 'userId' })

User.hasMany(Order, { as: 'orders', foreignKey: 'userId' })

module.exports = User
