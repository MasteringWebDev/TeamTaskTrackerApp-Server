const jwt = require('jsonwebtoken')

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

module.exports = isAuthenticated