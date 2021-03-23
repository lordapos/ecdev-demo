const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Product {
      id: Int!
      name: String!
      image: String!
      description: String!
      price: Float!
      userId: Int!
      brandId: Int!
      qty: Int
      rating: Int
      numReviews: Int
    }
    
    type User {
      id: Int!
      name: String!
      email: String!
      token: String!
    }
    
    input CartItem {
      id: Int!
      name: String!
      image: String!
      price: Float!
      qty: Int!
    }

    type Query {
      getProducts: [Product!]!
      getSortProducts(sort: String!): [Product!]!
      getProductById(id: ID!): Product!
      updateCart(items: [CartItem!]!): [Product!]!
    }
    
    type Mutation {
      createUser(email: String!, password: String!, name: String!): User!
      login(email: String!, password: String!): User!
    }
`)