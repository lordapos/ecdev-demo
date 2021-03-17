const User = require('../../../models/User')
const bcrypt = require('bcryptjs')
const generateToken = require('../../../utils/generateToken')
const matchPassword = require('../../../utils/matchPassword')

module.exports = {
  async createUser ({ email, password, name }) {
    const userExists = await User.findOne({
      where: { email },
    })
    if (userExists) {
      throw new Error('User already exists')
    }

    password = bcrypt.hashSync(password, 10)

    const user = await User.create({
      name,
      email,
      password,
    })

    if (user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      }
    } else {
      throw new Error('Invalid user data')
    }
  },

  async login ({ email, password }) {
    const user = await User.findOne({
      where: { email },
    })
    if (user && (await matchPassword(password, user.password))) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      }
    } else {
      throw new Error('Invalid email or password')
    }
  },
}