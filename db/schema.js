const crypto = require('crypto')
const mongoose = require('./connection.js')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  username: String,
  concerts: [{
    name: String,
    venue: String
  }],
  hash: String,
  salt: String
})

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex')
}

UserSchema.methods.validatePassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex')
  return this.hash === hash
}

UserSchema.methods.generateJwt = function() {
  var expiry = new Date()
  expirty.setDate(expiry.getDate() + 7)

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(expiry.getTime() / 1000)
  }, 'MY_SECRET')
}

const User = mongoose.model('User', UserSchema)
module.exports = User
