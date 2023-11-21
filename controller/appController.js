const Products = require('../models/Products')
const Users = require("../models/Users")

const productData = async (req, res) => {
  try {
    const data = await Products.find()
    res.status(200).send(data)
  }

  catch (error) {
    res.status(500).send({ msg: "Product is not found", error })
  }
}

const productSearch = async (req, res) => {
  try {
    const search = new RegExp(req.body.search, 'i')
    const data = await Products.find({ title: search })

    res.status(200).send(data)
  } catch (error) {
    res.status(500).send({ msg: "Product is not found", error })
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

    {
      cartProduct
        ? cartProduct.quantity += 1
        : User.cart.push({ productId, quantity: 1 })
    }

    await User.save()

    res.status(200).send({ msg: "Product is added to the cart", cart: User.cart })
  } catch (error) {
    res.status(500).send({ msg: "Product is not added to cart", error })
  }
}

const removeToCart = async (req, res) => {
  try {
    const { userId, productId } = req.params

    const User = await Users.findById(userId)
    const cartProduct = User.cart.find(item => item.productId.toString() === productId)

    {
      cartProduct.quantity > 1
        ? cartProduct.quantity -= 1
        : User.cart = User.cart.filter((item) => item.productId.toString() !== productId)
    }

    await User.save()

    res.status(200).send({ msg: "Product is removed from the cart", cart: User })
  }
  catch (error) {
    res.status(500).send({ msg: "Product does not exist in cart", error })
  }
}

const deleteFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params

    const User = await Users.findByIdAndUpdate(
      userId,
      {
        $pull: { cart: { productId } }
      },
      { new: true }
    )

    res.status(200).send({ msg: "Product is deleted from the cart", cart: User })
  } catch (error) {
    res.status(500).send({ msg: "Product does not exist in cart", error })
  }
}

module.exports = {
  productData,
  productSearch,
  cartData,
  addToCart,
  removeToCart,
  deleteFromCart
}