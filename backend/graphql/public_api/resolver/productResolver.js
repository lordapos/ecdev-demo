const Product = require('../../../models/Product')
const Brand = require('../../../models/Brand')
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

  async getBrands () {
    try {
      return await Brand.findAll({
        order: [
          ['name', 'ASC'],
        ],
      })
    } catch (e) {
      throw new Error('Fetch brands is not available')
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
      let order = null
      let price = null
      let brandId = null
      if (sort.sortBy) {
        if (sort.sortBy === 'date-desc') {
          order = {
            order: [
              ['createdAt', 'DESC'],
            ],
          }
        } else if (sort.sortBy === 'low_to_high') {
          order = {
            order: [
              ['price', 'ASC'],
            ],
          }
        } else if (sort.sortBy === 'high_to_low') {
          order = {
            order: [
              ['price', 'DESC'],
            ],
          }
        } else {
          order = [
            ['createdAt', 'DESC'],
          ]
        }
      }
      if (sort.price) {
        price = {
          [Op.lte]: sort.price,
        }
      } else {
        price = {
          [Op.lte]: 2000,
        }
      }
      if (sort.brands) {
        brandId = {
          [Op.or]: [sort.brands],
        }
      }
      args = {
        order,
        where: {
          price,
          brandId,
        },
      }
      console.log(args)
      return await Product.findAll(args)
    } catch (e) {
      throw new Error('Fetch products is not available')
    }
  },

  async updateCart ({ items }) {
    const ids = []
    items.forEach(item => {
      ids.push(item.id)
    })
    try {
      const products = await Product.findAll({
        where: {
          id: {
            [Op.or]: [ids],
          },
        },
      })

      const newProduct = []
      products.forEach(item => {
        const current = items.find(x => x.id === item.id)
        item.dataValues.qty = current.qty
        newProduct.push(item.dataValues)
      })

      return newProduct
    } catch (e) {
      throw new Error('Update cart is not available')
    }
  },
}