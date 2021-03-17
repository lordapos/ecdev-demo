const { mergeResolvers } = require('@graphql-tools/merge')
const userResolver = require('./userResolver')
const orderResolver = require('./orderResolver')

const resolvers = [
  userResolver,
  orderResolver,
  ];

module.exports = mergeResolvers(resolvers);