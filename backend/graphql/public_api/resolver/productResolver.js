const Product = require('../../../models/Product')
const Brand = require('../../../models/Brand')
const Review = require('../../../models/Review')
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
      const product = await Product.findOne({
        where: { id }, include: 'reviews',
      })

      return {
        id: product.id,
        name: product.name,
        image: product.image,
        images: product.images,
        description: product.description,
        price: product.price,
        userId: product.userId,
        brandId: product.brandId,
        sku: product.sku,
        youtubeEmbed: product.youtubeEmbed,
        highlights: product.highlights,
        specs: product.specs,
        rating: product.rating,
        numReviews: product.numReviews,
        review: JSON.stringify(product.reviews),
      }
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
          order = [
            ['createdAt', 'DESC'],
          ]
        } else if (sort.sortBy === 'low_to_high') {
          order = [
            ['price', 'ASC'],
          ]
        } else if (sort.sortBy === 'high_to_low') {
          order = [
            ['price', 'DESC'],
          ]
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
      if (sort.brands && sort.brands.length !== 0) {
        brandId = {
          [Op.or]: [sort.brands],
        }
      }
      if (brandId) {
        args = {
          order,
          where: {
            price,
            brandId,
          },
        }
      } else {
        args = {
          order,
          where: {
            price,
          },
        }
      }
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

  async addReview ({ data }) {
    try {
      await Review.create({
        name: data.name,
        email: data.email,
        title: data.title,
        review: data.review,
        rating: data.rating,
        productId: data.productId,

      })
      const id = data.productId

      let product = await Product.findOne({
        where: { id }, include: 'reviews',
      })
      const reviews = product.reviews

      product.rating = calcMiddleReviewValue(reviews)
      product.numReviews = reviews.length

      await product.save()

      return 'Review created'
    } catch (e) {
      throw new Error('Something went wrong, please try again later')
    }
  },
}

const calcMiddleReviewValue = (reviews) => {
  const ratingArray = []
  const ratingLength = reviews.length

  reviews.map(item => {
    ratingArray.push(item.rating)
  })

  if (ratingArray.length !== 0) {
    const allRatingValue = ratingArray.reduce((previousValue, currentValue) => {
      return previousValue + currentValue
    })
    return Math.ceil(allRatingValue / ratingLength)

  }
}
