const express = require('express')
const router = express.Router()
const Controller = require('../controller/appController')
const { login, signup } = require("../controller/loginController")

router.get("/product", Controller.productData)
router.get('/cart/:userId', Controller.cartData)
router.post("/cart/:userId/:productId", Controller.addToCart)
router.put("/cart", Controller.updateCart)
router.delete("/cart", Controller.deleteFromCart)
router.post("/login", login)
router.post("/signup", signup)

module.exports = router