import nc from 'next-connect'
import User from '../../../models/User'
import { connect, disconnect } from '../../../utils/db'

const handler = nc()

handler.put(async (req, res) => {
  await connect()
  const { email, orderItems } = req.body
  const user = await User.findOne({ email })

  let data
  if (user.orderItems[0] === null) {
    data = [...orderItems]
  } else {
    data = [...user.orderItems, ...orderItems]
  }

  user.orderItems = await data

  await user.save()
  res.send('updated')
  await disconnect()
})

handler.post(async (req, res) => {
  await connect()
  const { email, name, orderItems, address } = req.body

  const newUser = new User({ email, name, address, orderItems })

  const user = await newUser.save()
  res.send(user)
  await disconnect()
})

export default handler
