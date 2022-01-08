import nc from 'next-connect'
import User from '../../../models/User'
import { connect, disconnect } from '../../../utils/db'

const handler = nc()

handler.put(async (req, res) => {
  await connect()
  const { email, orderItems } = req.body
  const user = await User.findOne({ email })

  user.orderItems = await [...orderItems]

  await user.save()
  res.send('deleted..updated..')
  await disconnect()
})

export default handler
