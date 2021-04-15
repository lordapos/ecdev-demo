const {buildSchema} = require('graphql');

module.exports = buildSchema(`
    type User {
      id: Int!
      name: String!
      email: String!
      token: String!
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

    type Query {
      getUserProfile(token: String!): User!
      getOrder(id: Int!, token: String!): Order!
      getMyOrders(token: String!): [Order!]!
    }
    
    input UserInput {
      token: String!
      name: String!
      email: String!
      password: String
    }
    
    input OrderItem {
      id: Int!
      slug: String!
      name: String!
      image: String!
      price: Float!
      qty: Int!
    }
    
    input Address {
      address: String!
      city: String!
      country: String!
      postalCode: String!
    }
    
    input PaymentResult {
      id: String!
      status: String!
      update_time: String!
      email_address: String!
    }
    
    type Mutation {
      updateUserProfile(data: UserInput!): User!
      createOrder(token: String!, shippingAddress: Address!, paymentMethod: String!, shippingPrice: Float, totalPrice: Float!, orderItems: [OrderItem!]!): Order!
      updateOrderToPaid(id: Int!, data: PaymentResult!): Order!
    }
`);