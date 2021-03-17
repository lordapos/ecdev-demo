const jwt = require('jsonwebtoken')
const User = require('../models/User')
const dotenv = require('dotenv')
dotenv.config()

const validate = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  return await User.findByPk(decoded.id)
}

module.exports = validate