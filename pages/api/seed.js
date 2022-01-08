import nc from 'next-connect'
import Product from '../../models/Products'
import { connect, disconnect } from '../../utils/db'
import { data } from '../../utils/data'
import User from '../../models/User'

const handler = nc()

handler.get(async (req, res) => {
  await connect()
  await User.deleteMany()
  await User.insertMany(data.users)
  await Product.deleteMany()
  await Product.insertMany(data.products)
  await disconnect()
  res.send({ message: 'seeded successfully' })
})

export default handler
