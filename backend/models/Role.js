const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Role = sequelize.define('role', {
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

module.exports = Role
