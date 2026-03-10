const mongoose = require('mongoose')
const User = require('./user.models')

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 5
  },
  description: {
    type: String,
    default: ''
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['todo', 'inprogress', 'done'],
    default: 'todo'
  },
  deadline: {
    type: Date,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  }
}, {
  timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task