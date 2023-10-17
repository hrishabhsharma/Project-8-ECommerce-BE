const express = require('express')
const cors = require("cors")
const connectToDb = require("./config/connection")
const port = 4000

require('dotenv').config()
const router = require('./router/appRouting')

const app = express()
app.use(express.json())
// app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*"
}))

app.use(router)
connectToDb()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`App listening on port ${port}!`))