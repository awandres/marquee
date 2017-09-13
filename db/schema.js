const mongoose = require('./connection.js')

const UserSchema = new mongoose.Schema({
  name: String,
  concert: String
})

const User = mongoose.model('User', UserSchema)
module.exports = User
