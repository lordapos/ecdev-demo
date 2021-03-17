const Product = require('../../../models/Product')

module.exports = {
  async deleteProduct ({ id }) {
    try {
      const product = await Product.findByPk(id)
      await product.destroy()
      return true
    } catch (e) {
      throw new Error('Id is required')
    }
  },

  async updateProduct ({ data }) {
    try {
      const product = await Product.findByPk(data.id)
      Object.assign(product, data)
      return await product.save()
    } catch (e) {
      throw new Error('Not authorized, token failed')
    }
  },

  async addProduct ({ data }) {
    try {
      const product = await Product.create({
        name: data.name,
        image: data.image,
        description: data.description,
        price: data.price,
        userId: 1,
      })
      return await product
    } catch (e) {
      throw new Error('Not authorized, token failed')
    }
  },
}