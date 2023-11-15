const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
    maxlength: [10, 'Mobile number should be of 10 digits'],
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  cart: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Products',
    },
    quantity: {
      type: Number,
    }
  }]
})

module.exports = mongoose.model('Users', UserSchema)