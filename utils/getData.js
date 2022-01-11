const { default: User } = require('../models/User')
const { default: Product } = require('../models/Products')
const { connect, disconnect, convertDocToObj } = require('./db')

async function getProducts() {
  await connect()
  const products = await Product.find({}).lean()

  await disconnect()

  return { data: products?.map(convertDocToObj) }
}

async function getFilteredProducts() {
  await connect()
  const products = await Product.find({}).lean()

  await disconnect()

  const final = products
    ?.map(convertDocToObj)
    ?.map(({ _id, slug, price, title, category, image }) => ({
      _id,
      slug,
      price,
      title,
      category,
      image
    }))

  return final
}

async function getUserData() {
  await connect()
  const user = await User.findOne({ email: 'dev@example.com' })

  await disconnect()

  const { email, name, address, orderItems } = user

  return {
    user: { email, name, address, orderItems }
  }
}

async function getAllUsers() {
  await connect()
  const user = await User.find({}).lean()

  await disconnect()

  return user
}

export { getFilteredProducts, getProducts, getUserData, getAllUsers }
