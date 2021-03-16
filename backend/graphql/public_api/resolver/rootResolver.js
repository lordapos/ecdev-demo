const { mergeResolvers } = require('@graphql-tools/merge')
const productResolver = require('./productResolver')

const resolvers = [
  productResolver,
];

module.exports = mergeResolvers(resolvers);