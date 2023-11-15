const Products = require('../models/Products')
const Users = require("../models/Users")

const productData = async (req, res) => {
  try {
    const data = await Products.find()
    res.status(200).send(data)
  }

  catch (error) {
    res.status(500).send({ msg: "error occurred", error })
  }
}

const cartData = async (req, res) => {
  try {
    const { userId } = req.params
    const userCart = await Users.findById(userId).populate('cart.productId')
    return res.status(200).send({ cart: userCart.cart })
  }
  catch (error) {
    res.status(500).send({ msg: "There is nothing in the cart", error })
  }
}

const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.params
    const User = await Users.findById(userId)
    const cartProduct = User.cart.find(item => item.productId.toString() === productId)
    if (!cartProduct) {
      User.cart.push({ productId, quantity: 1 })
      await User.save()
      return res.status(200).send({ msg: "Product is added to the cart", cart: User.cart })
    }
    cartProduct.quantity += 1;
    await User.save()
    return res.status(200).send({ msg: "Quantity of product increased by 1", cart: User.cart })
  } catch (error) {
    res.status(500).send({ msg: "item not added to cart", error })
  }
}

const updateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body
    const User = await Users.updateOne({ _id: userId, 'cart.productId': productId }, { $set: { quantity } })
    // const User = await Users.updateOne({ userId }, { $push: { cart: { productId, quantity } } })
    // const cartProduct = User.cart.find(item => item.productId.toString() === productId)
    return res.status(200).send({ msg: "Product is updated to the cart", cart: User })
  }
  catch (error) {
    res.status(500).send({ msg: "item not added to cart", error })
  }
}

const deleteFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body
    const User = await Users.findById(userId)
    const cartProduct = User.cart.find(item => item.productId.toString() === productId)
    if (cartProduct) {
      User.cart = User.cart.filter((item) => item.productId.toString() !== productId)
      await User.save()
      return res.status(200).send({ msg: "Product is removed from the cart", cart: User.cart })
    }
    return res.status(200).send({ msg: "Product does not exist in cart", cart: User.cart })
  } catch (error) {
    res.status(500).send({ msg: "item not added to cart", error })
  }
}

module.exports = {
  productData,
  cartData,
  addToCart,
  updateCart,
  deleteFromCart
}