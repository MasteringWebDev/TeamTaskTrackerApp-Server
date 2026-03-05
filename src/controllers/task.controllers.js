const Task = require('../models/task.models')

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('creator', 'fullName department')

    res.json({
      status: 'SUCCESS',
      tasks
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Server error'
    })
  }
}

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
      message: 'Task created successfully',
      task: taskWithCreator
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Server error'
    })
  }
}

const updateTask = async (req, res) => {
  try {
    const task = req.task

    const {
      title,
      description,
      priority,
      status,
      deadline
    } = req.body

    if(title != undefined) task.title = title
    if(description != undefined) task.description = description
    if(priority != undefined) task.priority = priority
    if(status != undefined) task.status = status
    if(deadline != undefined) task.deadline = deadline

    await task.save()

    const taskWithCreator = await task.populate('creator', 'fullName department')

    res.json({
      status: 'SUCCESS',
      message: 'Task updated successfully',
      task: taskWithCreator
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Server error'
    })
  }
}

const deleteTask = async (req, res) => {
  try {
    const task = req.task
    
    await task.deleteOne()

    res.json({
      status: 'SUCCESS',
      message: 'Task deleted successfully'
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