const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
const cors = require('cors')

const logger = require('./src/middlewares/logger')

const userRoutes = require('./src/routes/user.routes')
const taskRoutes = require('./src/routes/task.routes')

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}))

app.use(logger)

app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)

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