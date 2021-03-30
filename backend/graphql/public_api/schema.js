const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Product {
      id: Int!
      name: String!
      image: String!
      description: String
      price: Float!
      userId: Int!
      brandId: Int!
      sku: String!
      youtubeLink: String!
      highlights: String
      specs: String
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
    
    type Brand {
      id: Int!
      name: String!
    }
    
    input CartItem {
      id: Int!
      name: String!
      image: String!
      price: Float!
      qty: Int!
    }
    
    input sortItem {
      sortBy: String
      price: Float
      brands: [Int]
    }

    type Query {
      getProducts: [Product!]!
      getBrands: [Brand!]!
      getSortProducts(sort: sortItem!): [Product!]!
      getProductById(id: ID!): Product!
      updateCart(items: [CartItem!]!): [Product!]!
    }
    
    type Mutation {
      createUser(email: String!, password: String!, name: String!): User!
      login(email: String!, password: String!): User!
    }
`)