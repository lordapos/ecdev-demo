const { mergeResolvers } = require('@graphql-tools/merge')
const userResolver = require('./userResolver')
const productResolver = require('./productResolver')
const orderResolver = require('./orderResolver')

const resolvers = [
  userResolver,
  productResolver,
  orderResolver,
]

module.exports = mergeResolvers(resolvers)