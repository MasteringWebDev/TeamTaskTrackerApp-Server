const jwt = require('jsonwebtoken')
const Task = require('../models/task.models')

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token

  if(!token) {
    return res.status(401).json({
      status: 'FAILED',
      message: 'Not authenticated. Please login'
    })
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req._id = _id
    next()
  } catch (error) {
    return res.status(401).json({
      status: 'FAILED',
      message: 'Not authenticated. Please login'
    })
  }
}

const isTaskCreator = async (req, res, next) => {
  const currentUserId = req._id
  
  try {
    const task = await Task.findById(req.params.id)
    if(!task) {
      return res.status(404).json({
        status: 'FAILED',
        message: 'Task not found'
      })
    }

    if(task.creator.toString() != currentUserId.toString()) {
      return res.status(403).json({
        status: 'FAILED',
        message: 'Access denied. Only the task creator can perform this action.'
      })
    }

    req.task = task

    next()
  } catch (error) {
    return res.status(401).json({
      status: 'FAILED',
      message: 'Not authenticated. Please login'
    })
  }
}

const isTaskCreatorOrAssignee = async (req, res, next) => {
  const currentUserId = req._id
  
  try {
    const task = await Task.findById(req.params.id)
    if(!task) {
      return res.status(404).json({
        status: 'FAILED',
        message: 'Task not found'
      })
    }

    if(task.creator.toString() != currentUserId.toString() && task.assignee.toString() != currentUserId.toString()) {
      return res.status(403).json({
        status: 'FAILED',
        message: 'Access denied. Only the task creator can perform this action.'
      })
    }

    req.task = task

    next()
  } catch (error) {
    return res.status(401).json({
      status: 'FAILED',
      message: 'Not authenticated. Please login'
    })
  }
}

module.exports = { 
  isAuthenticated,
  isTaskCreator,
  isTaskCreatorOrAssignee
}