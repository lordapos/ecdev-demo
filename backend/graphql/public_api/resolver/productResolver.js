const Product = require('../../../models/Product')

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

  async getSortProducts ({ sort }) {
    try {
      let args = {}
      if (sort === 'date-desc') {
        args = {
          order: [
            ['createdAt', 'DESC'],
          ],
        }
      } else if (sort === 'low_to_high') {
        args = {
          order: [
            ['price', 'ASC'],
          ],
        }
      } else if (sort === 'high_to_low') {
        args = {
          order: [
            ['price', 'DESC'],
          ],
        }
      } else {
        args = {
          order: [
            ['createdAt', 'DESC'],
          ],
        }
      }
      return await Product.findAll(args)
    } catch (e) {
      throw new Error('Fetch products is not available')
    }
  },
}