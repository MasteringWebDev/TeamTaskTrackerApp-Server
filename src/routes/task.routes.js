const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middlewares/auth')

const {
  // getTasks,
  createTask,
  // updateTask,
  // deleteTask
} = require('../controllers/task.controllers')

router.use(isAuthenticated)

router.get('/', getTasks)
router.post('/', createTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router