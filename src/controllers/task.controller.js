const Task = require('../models/task.model')

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      status,
      deadline
    } = req.body

    const task = await Task.create({
      title,
      description,
      priority,
      status,
      deadline,
      creator: req._id
    })

    const taskWithCreator = await task.populate('creator', 'fullName department')

    res.status(201).json({
      status: 'SUCCESS',
      message: 'Account created successfully',
      task: taskWithCreator
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Server error'
    })
  }
}


module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
}