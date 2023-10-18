const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Cart = new Schema(
  {
    id: {
      required: true,
      type: String,
      unique: true,
    },
    category: {
      required: true,
      type: String,
    },
    brand: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
      unique: true,
    },
    costPrice: {
      required: true,
      type: String,
    },
    discount: {
      required: true,
      type: String,
    },
    sellingPrice: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
    quanity: {
      require: true,
      type: String,
    }
  },
  {
    _id: false,
  },
)

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [Cart]
})

module.exports = mongoose.model('Users', UserSchema)