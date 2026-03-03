const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

const app = express()

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Team Task Track App Server',
    now: new Date()
  })
})

const PORT = process.env.PORT
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })