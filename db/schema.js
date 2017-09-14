const mongoose = require('./connection.js')

const UserSchema = new mongoose.Schema({
  name: String,
  concerts: [{
    name: String,
    venue: String
  }]
})

const User = mongoose.model('User', UserSchema)
module.exports = User
