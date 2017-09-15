const mongoose = require('./connection.js')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const GroupSchema = new mongoose.Schema({
  groupname: String,
  concerts: [{
    name: String,
    venue: String,
    url: String
  }]
})

const UserSchema = new mongoose.Schema({
  username: String,
  concerts: [{
    name: String,
    venue: String,
    url: String
  }],
  groups: [GroupSchema],
  hash: String,
  salt: String
})

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex')
}

UserSchema.methods.validatePassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex')
  return this.hash === hash
}

UserSchema.methods.generateJwt = function() {
  var expiry = new Date()
  expiry.setDate(expiry.getDate() + 7)

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(expiry.getTime() / 1000)
  }, process.env.TOKEN)

}

const User = mongoose.model('User', UserSchema)
const Group = mongoose.model('Group', GroupSchema)
module.exports = {
  User: User,
  Group: Group
}
