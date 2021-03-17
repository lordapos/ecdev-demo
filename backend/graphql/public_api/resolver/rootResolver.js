const { mergeResolvers } = require('@graphql-tools/merge')
const productResolver = require('./productResolver')
const userResolver = require('./userResolver')

const resolvers = [
  productResolver,
  userResolver,
];

module.exports = mergeResolvers(resolvers);