const jwt = require('jsonwebtoken')
const User = require('../../../models/User')

module.exports = {
  async checkAdminRole ({ token }) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findOne({
        where: { id: decoded.id }, include: 'roles',
      })
      const existRole = user.roles.find(item => item.user_role.roleId === 3)
      const existModerator = user.roles.find(item => item.user_role.roleId === 3)

      return { isAdmin: !!existRole, isModerator: !!existModerator }
    } catch (e) {
      throw new Error('Not authorized, token failed')
    }
  },

  async getUsers () {
    try {
      return await User.findAll()
    } catch (e) {
      throw new Error('Not authorized, token failed')
    }
  },

  async deleteUser ({ id }) {
    try {
      const user = await User.findByPk(id)
      await user.destroy()
      return true
    } catch (e) {
      throw new Error('Id is required')
    }
  },

  async getUserProfile ({ id }) {
    try {
      return await User.findByPk(id)
    } catch (e) {
      throw new Error('Id is required')
    }
  },

  async updateUser ({ data }) {
    const user = await User.findByPk(data.id)
    if (user) {
      if (data.password) {
        user.password = bcrypt.hashSync(data.password, 10)
      } else {
        delete data.password
      }
      Object.assign(user, data)
      return await user.save()
    } else {
      throw new Error('Not authorized, token failed')
    }
  },
}