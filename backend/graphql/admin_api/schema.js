const { buildSchema } = require('graphql')

module.exports = buildSchema(`

    type User {
      id: Int!
      name: String!
      email: String!
    }
    
    type Product {
      id: Int!
      name: String!
      image: String!
      description: String!
      price: Float!
      userId: Int!
    }
    
    type Order {
      id: Int!
      userId: Int!
      orderItems: String!
      shippingAddress: String!
      paymentMethod: String!
      paymentResult: String!
      shippingPrice: Float!
      totalPrice: Float!
      isPaid: Boolean!
      paidAt: String
      isDelivered: Boolean!
      deliveredAt: String
      createdAt: String!
    }
    
    type Role {
      isAdmin: Boolean!
      isModerator: Boolean!
    }
    
    type Query {
      checkAdminRole(token: String!): Role!
      getUsers: [User!]!
      getUserProfile(id: Int!): User!
      getOrder(id: Int!): Order!
      getOrders: [Order!]!
    }
    
    input UserInput {
      id: Int!
      name: String!
      email: String!
      password: String
    }
    
    input ProductInput {
      id: Int
      name: String!
      image: String!
      description: String!
      price: Float!
    }
    
    type Mutation {
      deleteUser(id: ID!): Boolean!
      deleteProduct(id: ID!): Boolean!
      updateUser(data: UserInput!): User!
      updateProduct(data: ProductInput!): Product!
      addProduct(data: ProductInput!): Product!
      deliverOrder(id: ID!): Order!
    }
`)