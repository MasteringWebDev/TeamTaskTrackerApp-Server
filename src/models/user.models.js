const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  department: String
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User