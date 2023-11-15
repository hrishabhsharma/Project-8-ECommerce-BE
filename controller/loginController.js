const Users = require("../models/Users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const signup = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body

    const existingUser = await Users.findOne({ email })
    if (existingUser) {
      return res.status(200).send({ msg: "This Email is already registered, Please use new Email" })
    }

    const saltRound = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, saltRound)

    const token = jwt.sign({ email }, process.env.secretKey, { expiresIn: "24h" })

    const temp = { name, phone, email, password: hashPass }
    const user = await Users.create(temp)

    return res.status(200).send({
      user,
      msg: "User is registered, Successfully!!",
      token: token,
    })
  }

  catch (error) {
    return res.status(500).send({ msg: "User has not registered,please try again", error: error })
  }
}


const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const existingUser = await Users.findOne({ email })
    if (!existingUser) {
      return res.status(401).send({ msg: "User is not registered" })
    }

    const validate = await bcrypt.compare(password, existingUser.password)
    if (!validate) {
      return res.status(403).send({ msg: "Password is Wrong" })
    }

    const token = jwt.sign({ email }, process.env.secretKey, { expiresIn: "24h" })

    return res.status(200).send({
      msg: "User has logged in successfully",
      token: token,
      user: existingUser,
    })
  }

  catch (error) {
    return res.status(500).send({ msg: "User has not logged in,please try again", error })
  }

}

module.exports = { login, signup }