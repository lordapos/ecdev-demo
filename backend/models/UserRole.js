const sequelize = require('../utils/database')

const UserRole = sequelize.define('user_role', {

}, { timestamps: false })

module.exports = UserRole