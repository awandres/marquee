const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../db/schema.js')


passport.use(new LocalStrategy({
  usernameField: 'username'
},
function(username, password, done) {
  User.findOne({username: username}, function(err, user) {
    if (err) {return done(err)}
    if(!user) {
      return done(null, false, {
        message: 'User not found'
      })
    }
    if (!user.validatePassword(password)) {
      return done(null, false, {
        message: 'Incorrect Password'
      })
    }
    return done(null, user)
  })
}
))
