const Products = require('../models/Products')

const homeData = async (req, res) => {
  try {
    const data = await Products.find()
    res.send({ data: data })
  } catch (error) {
    res.send("error occurred", error)
  }
}
const mobileData = async (req, res) => {
  try {
    const data = await Products.find({ category: "mobiles" })
    res.send({ data: data })
  } catch (error) {
    res.send("error occurred", error)
  }
}
const fashionData = async (req, res) => {
  try {
    const data = await Products.find({ category: "fashion" })
    res.send({ data: data })
  } catch (error) {
    res.send("error occurred", error)
  }
}
const electronicsData = async (req, res) => {
  try {
    const data = await Products.find({ category: "electronics" })
    res.send({ data: data })
  } catch (error) {
    res.send("error occurred", error)
  }
}
const appliancesData = async (req, res) => {
  try {
    const data = await Products.find({ category: "appliances" })
    res.send({ data: data })
  } catch (error) {
    res.send("error occurred", error)
  }
}
const productData = async (req, res) => {
  try {
    const url = req.params
    const data = await Products.find({ category: url.category, id: url.id })
    res.send({ data: data })
  } catch (error) {
    res.send("error occurred", error)
  }
}

module.exports = {
  homeData,
  mobileData,
  fashionData,
  electronicsData,
  appliancesData,
  productData
}