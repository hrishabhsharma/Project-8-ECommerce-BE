const Users = require("../models/Users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const signup = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body
    const existingUser = await Users.findOne({ email })
    if (existingUser) {
      return res.send({ msg: "This Email is already registered, Please use new Email" })
    }
    const saltRound = await bcrypt.genSalt(10)
    const hashPass = bcrypt.hashSync(password, saltRound)
    const token = jwt.sign({ email }, process.env.secretKey, { expiresIn: "10 days" })
    const temp = {
      name: name,
      phone: phone,
      email: email,
      password: hashPass,
    }
    await Users.create(temp)
    return res.status(200).send({
      msg: "User is registered, Successfully!!",
      token: token,
    })
  } catch (error) {
    return res.send({ msg: "User has not registered,please try again", error })
  }
}


const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const existingUser = await Users.findOne({ email })
    if (existingUser) {
      const validate = bcrypt.compareSync(password, existingUser.password)
      if (validate) {
        const token = jwt.sign({ email }, process.env.secretKey, { expiresIn: "10 days" })
        return res.status(200).send({
          msg: "User has logged in successfully",
          token: token,
          username: existingUser.name,
        })
      }
      return res.status(403).send({ msg: "Password is Wrong" })
    }
    return res.status(401).send({ msg: "User is not registered" })
  } catch (error) {
    return res.status(400).send({ msg: "User has not logged in,please try again", error })
  }

}

module.exports = { login, signup }