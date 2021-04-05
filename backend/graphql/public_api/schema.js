const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Product {
      id: Int!
      name: String!
      slug: String!
      image: String!
      images: String
      description: String
      price: Float!
      userId: Int!
      brandId: Int!
      categoryId: Int!
      sku: String!
      youtubeEmbed: String
      highlights: String
      specs: String
      qty: Int
      rating: Int
      numReviews: Int
      review: String
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
    
    type Category {
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
    
    input Review {
      name: String!
      email: String!
      title: String!
      review: String!
      rating: Int
      productId: Int!
   }
   
   input Mail {
      name: String!
      email: String!
      website: String
      message: String
      radioGroup: String
   }

    type Query {
      getCatProducts(category: String!): [Product!]!
      getProducts: [Product!]!
      getBrands: [Brand!]!
      getCategories: [Category!]!
      getSortProducts(sort: sortItem!, category: String!): [Product!]!
      getProductById(id: ID!): Product!
      getProductBySlug(slug: String!): Product!
      updateCart(items: [CartItem!]!): [Product!]!
    }
    
    type Mutation {
      createUser(email: String!, password: String!, name: String!): User!
      login(email: String!, password: String!): User!
      addReview(data: Review!): String
      sendMail(data: Mail!): String
    }
`)