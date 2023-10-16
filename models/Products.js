const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = new Schema({
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
  source: {
    required: true,
    type: String,
  },
})
// const ProductSchema = new Schema({
//   id: String,
//   category: String,
//   brand: String,
//   title: String,
//   costPrice: String,
//   discount: String,
//   sellingPrice: String,
//   image: String,
//   source: String,
// })

module.exports = mongoose.model('Products', ProductSchema)