const express = require('express')
const router = express.Router()

const { 
  isAuthenticated,
  isTaskCreator,
  isTaskCreatorOrAssignee
} = require('../middlewares/auth')

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/task.controllers')

router.use(isAuthenticated)

router.get('/', getTasks)
router.post('/', createTask)
router.patch('/:id', isTaskCreatorOrAssignee, updateTask)
router.delete('/:id', isTaskCreator, deleteTask)

module.exports = router