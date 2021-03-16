const Product = require('../../../models/Product')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  async getProducts () {
    try {
      return await Product.findAll({
        order: [
          ['createdAt', 'DESC'],
        ],
      })
    } catch (e) {
      throw new Error('Fetch products is not available')
    }
  },

  async getProductById ({ id }) {
    try {
      return await Product.findByPk(id)
    } catch (e) {
      throw new Error('Fetch product is not available')
    }
  },
}