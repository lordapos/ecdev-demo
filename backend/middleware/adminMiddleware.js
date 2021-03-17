const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const dotenv = require('dotenv')
const User = require('../models/User')
dotenv.config()

const admin = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({
      where: { id: decoded.id }, include: 'roles',
    })
    const existRole = user.roles.find(item => item.user_role.roleId === 3)
    if (!!existRole) {
      next()
    } else {
      res.status(401)
      throw new Error('You don\'t have access')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = admin
