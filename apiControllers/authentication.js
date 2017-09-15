const passport = require('passport')
const User = require('../db/schema.js').User

module.exports.register = function(req, res) {
  var user = new User()

  user.username = req.body.username

  user.setPassword(req.body.password)

  user.save(function(err) {
    var token
    console.log(err)
    token = user.generateJwt()
    console.log(token)
    res.status(200)
    res.json({
      "token": token
    })
  })
}

module.exports.login = function(req, res) {
  passport.authenticate('local', function(err, user, info) {
    var token
    if(err) {
      res.status(404).json(err)
      console.log(err)
    }

    if(user) {
      token = user.generateJwt()

      res.status(200)
      res.json({
        "token" : token
      })
    } else {
      res.status(401).json(info)
    }
  })(req, res)
}
