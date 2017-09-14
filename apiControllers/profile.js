const User = require('./schema.js')

module.exports.profileRead = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    })
  } else {
    User.findById(req.payload._id).exec(function(user) {
      res.status(200).json(user)
    })
  }
}
