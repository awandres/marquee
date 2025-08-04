const mongoose = require('./connection.js')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const GroupSchema = new mongoose.Schema({
  groupname: {
    type: String,
    required: [true, 'Group name is required'],
    unique: true,
    trim: true,
    minlength: [2, 'Group name must be at least 2 characters'],
    maxlength: [50, 'Group name cannot exceed 50 characters']
  },
  concerts: [{
    name: {
      type: String,
      required: [true, 'Concert name is required'],
      trim: true,
      maxlength: [100, 'Concert name cannot exceed 100 characters']
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
      maxlength: [100, 'Venue cannot exceed 100 characters']
    },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/.+/.test(v)
        },
        message: 'URL must be a valid HTTP/HTTPS URL'
      }
    },
    dateAdded: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
  },
  concerts: [{
    name: {
      type: String,
      required: [true, 'Concert name is required'],
      trim: true,
      maxlength: [100, 'Concert name cannot exceed 100 characters']
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
      maxlength: [100, 'Venue cannot exceed 100 characters']
    },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/.+/.test(v)
        },
        message: 'URL must be a valid HTTP/HTTPS URL'
      }
    },
    dateAdded: {
      type: Date,
      default: Date.now
    }
  }],
  groups: [GroupSchema],
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Update the updatedAt field before saving
GroupSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
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
