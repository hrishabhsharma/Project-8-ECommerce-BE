const express = require('express')
const router = express.Router()
const Controller = require('../controller/appController')
const { login, signup } = require("../controller/loginController")

router.get("/product", Controller.productData)

router.get('/cart/:userId', Controller.cartData)
router.post("/cart/:userId/:productId", Controller.addToCart)
router.put("/cart/:userId/:productId", Controller.removeToCart)
router.delete("/cart/:userId/:productId", Controller.deleteFromCart)

router.post("/login", login)
router.post("/signup", signup)

// router.post('/search', Controller.productSearch)

module.exports = router