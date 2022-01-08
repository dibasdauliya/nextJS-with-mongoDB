import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    name: { type: String, required: true },
    address: { type: String, required: true },
    orderItems: { type: Array }
  },
  {
    timestamps: true
  }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
