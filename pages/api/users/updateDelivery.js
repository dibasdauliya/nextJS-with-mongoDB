import nc from 'next-connect'
import User from '../../../models/User'
import { connect, disconnect } from '../../../utils/db'

const handler = nc()

handler.put(async (req, res) => {
  await connect()
  const { productID, mainID } = req.body
  const user = await User.findOne({ _id: mainID })

  const data = user.orderItems.map((item) => {
    if (item.id === productID) {
      return { ...item, delivered: !item.delivered }
    } else {
      return item
    }
  })

  user.orderItems = data

  await user.save()
  res.send('updated...')
  await disconnect()
})

export default handler
