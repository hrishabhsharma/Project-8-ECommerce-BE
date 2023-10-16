const express = require('express')
const router = express.Router()
const Controller = require('../controller/appController')
const { login, signup } = require("../controller/loginController")

router.get("/home", Controller.homeData)
router.get("/mobiles", Controller.mobileData)
router.get("/fashion", Controller.fashionData)
router.get("/electronics", Controller.electronicsData)
router.get("/appliances", Controller.appliancesData)
router.get("/:category/:id", Controller.productData)
router.post("/login", login)
router.post("/signup", signup)

module.exports = router