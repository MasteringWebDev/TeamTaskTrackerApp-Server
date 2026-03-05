const logger = (req, res, next) => {
  const now = Date.now()
  console.log(`${now}: ${req.method} ${req.url}`)
  next()
}

module.exports = logger