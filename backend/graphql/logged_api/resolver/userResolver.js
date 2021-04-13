const bcrypt = require('bcryptjs')
const generateToken = require('../../../utils/generateToken')
const validateToken = require('../../../utils/validateToken')

module.exports = {
  async getUserProfile ({ token }) {
    try {
      return await validateToken(token)
    } catch (e) {
      throw new Error('Not authorized, token failed')
    }
  },

  async updateUserProfile ({ data }) {
    const user = await validateToken(data.token)
    if (user) {
      data.password = bcrypt.hashSync(data.password, 10)
      Object.assign(user, data)
      const updatedUser = await user.save()
      return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser.id),
      }
    } else {
      throw new Error('Not authorized, token failed')
    }
  },
}