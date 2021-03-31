const dotenv = require('dotenv')
const bcrypt = require('bcryptjs');
const Product = require('./models/Product')
const User = require('./models/User')
const Role = require('./models/Role')
const Brand = require('./models/Brand')
const Order = require('./models/Order')
const products = require('./data/products')
const brands = require('./data/brands')
const roles = require('./data/roles')
const reviews = require('./data/reviews')
const UserRole = require('./models/UserRole')
const Review = require('./models/Review')

dotenv.config()

const sequelize = require('./utils/database')
const { Model } = require('sequelize')
async function db() {
  try {
    await sequelize.sync()
  } catch (e) {
    console.log(e)
  }
}

db()
const importData = async () => {
  try {
    await User.destroy({ where: {} })
    await Role.destroy({ where: {} })
    await UserRole.destroy({ where: {} })
    await Product.destroy({ where: {} })
    await Brand.destroy({ where: {} })
    await Order.destroy({ where: {} })
    await Review.destroy({ where: {} })
    await Role.bulkCreate(roles, { validate: true })
    const new_user = await User.create({
      name: 'ecdev',
      email: 'lordapos@gmail.com',
      password: bcrypt.hashSync('123456', 10),
    })
    let InsertArr = {
      userId: new_user.dataValues.id,
      roleId: 2
    }
    await UserRole.create(InsertArr);
    InsertArr = {
      userId: new_user.dataValues.id,
      roleId: 3
    }
    await UserRole.create(InsertArr);
    await Brand.bulkCreate(brands, { validate: true })
    await Product.bulkCreate(products, { validate: true })
    // await Review.bulkCreate(reviews, { validate: true })
    console.log('Data Imported!');
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit();
  }
}

const destroyData = async () => {
  try {
    await Product.destroy({ where: {} })
    await User.destroy({ where: {} })
    await Role.destroy({ where: {} })
    await Brand.destroy({ where: {} })
    await UserRole.destroy({ where: {} })
    await Order.destroy({ where: {} })
    await Review.destroy({ where: {} })
    console.log('Data Destroyed!');
    process.exit();
  } catch (e) {
    console.log('Data Destroyed!');
  }
}

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}