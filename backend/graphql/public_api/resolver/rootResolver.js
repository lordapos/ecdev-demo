const { mergeResolvers } = require('@graphql-tools/merge')
const productResolver = require('./productResolver')
const userResolver = require('./userResolver')
const mailResolver = require('./mailResolver')

const resolvers = [
  productResolver,
  userResolver,
  mailResolver,
];

module.exports = mergeResolvers(resolvers);