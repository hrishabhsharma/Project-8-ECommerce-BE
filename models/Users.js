const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = mongoose.Schema(
  {
    cartItem: Object,
    cartTotalAmount: Number,
    cartTotalQuantity: Number,
  },
  { timestamps: true }
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
  }],
  orderedProducts: [{ type: orderSchema }]
})

module.exports = mongoose.model('Users', UserSchema)