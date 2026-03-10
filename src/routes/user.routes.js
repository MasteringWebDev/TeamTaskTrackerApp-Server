const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middlewares/auth')

const {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getUsers
} = require('../controllers/user.controllers')

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', isAuthenticated, logoutUser)
router.get('/current-user', isAuthenticated, getCurrentUser)
router.get('/', isAuthenticated, getUsers)

module.exports = router