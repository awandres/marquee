// server.js

// modules =================================================
require('dotenv').config()
const logger = require('./utils/logger')

logger.info('Starting Marquee application...', { 
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080
})

const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const path = require('path')
// const favicon = require('serve-favicon')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const User = require('./db/schema.js').User
const Group = require('./db/schema.js').Group
const jwt = require('express-jwt')
const auth = jwt({
  secret: process.env.TOKEN,
  userProperty: 'payload'
})
const ctrlProfile = require('./apiControllers/profile');
const ctrlAuth = require('./apiControllers/authentication');
require('./config/passport.js')
require('./db/connection.js')


app.set('port', process.env.PORT || 8080)
app.use('/assets', express.static('public'))
app.use('/node_modules', express.static('node_modules'))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json({extended:true, limit: '10mb'}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(passport.initialize())

// Input sanitization middleware
const sanitizeInput = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim()
      }
    })
  }
  if (req.params) {
    Object.keys(req.params).forEach(key => {
      if (typeof req.params[key] === 'string') {
        req.params[key] = req.params[key].trim()
      }
    })
  }
  next()
}

app.use(sanitizeInput)

// Global error handler
const errorHandler = (err, req, res, next) => {
  logger.error('Global error handler', err)
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      details: Object.values(err.errors).map(val => val.message)
    })
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format'
    })
  }
  
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  })
}


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')


app.get('/api/profile', auth, ctrlProfile.profileRead);

app.post('/api/register', ctrlAuth.register);
app.post('/api/login', ctrlAuth.login);


app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password -__v')
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    })
  } catch (error) {
    logger.error('Error fetching users', error)
    res.status(500).json({
      success: false,
      error: 'Server error while fetching users'
    })
  }
})

app.get('/api/users/:username', async (req, res) => {
  try {
    const { username } = req.params
    
    if (!username || username.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Username parameter is required'
      })
    }
    
    const users = await User.find({ username: username.trim() }).select('-password -__v')
    
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }
    
    res.status(200).json({
      success: true,
      data: users
    })
  } catch (error) {
    logger.error('Error fetching user', error)
    res.status(500).json({
      success: false,
      error: 'Server error while fetching user'
    })
  }
})

app.get('/api/groups', async (req, res) => {
  try {
    const groups = await Group.find({}).select('-__v')
    res.status(200).json({
      success: true,
      count: groups.length,
      data: groups
    })
  } catch (error) {
    logger.error('Error fetching groups', error)
    res.status(500).json({
      success: false,
      error: 'Server error while fetching groups'
    })
  }
})

app.put('/api/users/:username', async (req, res) => {
  try {
    const { username } = req.params
    const concertData = req.body
    
    if (!username || username.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Username parameter is required'
      })
    }
    
    if (!concertData || Object.keys(concertData).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Concert data is required'
      })
    }
    
    const user = await User.findOneAndUpdate(
      { username: username.trim() },
      { "$push": { "concerts": concertData } },
      { new: true, runValidators: true }
    ).select('-password -__v')
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }
    
    logger.info('Updated user concerts', { username: user.username })
    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    logger.error('Error updating user concerts', error)
    res.status(500).json({
      success: false,
      error: 'Server error while updating user'
    })
  }
})

app.put('/api/users/:username/groups', async (req, res) => {
  try {
    const { username } = req.params
    const groupData = req.body
    
    if (!username || username.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Username parameter is required'
      })
    }
    
    if (!groupData || Object.keys(groupData).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Group data is required'
      })
    }
    
    const user = await User.findOneAndUpdate(
      { username: username.trim() },
      { "$push": groupData },
      { new: true, runValidators: true }
    ).select('-password -__v')
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }
    
    logger.info('Updated user groups', { username: user.username })
    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    logger.error('Error updating user groups', error)
    res.status(500).json({
      success: false,
      error: 'Server error while updating user groups'
    })
  }
})

app.put('/api/groups/:groupname', async (req, res) => {
  try {
    const { groupname } = req.params
    const concertData = req.body
    
    if (!groupname || groupname.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Group name parameter is required'
      })
    }
    
    if (!concertData || Object.keys(concertData).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Concert data is required'
      })
    }
    
    const group = await Group.findOneAndUpdate(
      { groupname: groupname.trim() },
      { "$push": { "concerts": concertData } },
      { new: true, runValidators: true }
    ).select('-__v')
    
    if (!group) {
      return res.status(404).json({
        success: false,
        error: 'Group not found'
      })
    }
    
    logger.info('Updated group concerts', { groupname: group.groupname })
    res.status(200).json({
      success: true,
      data: group
    })
  } catch (error) {
    logger.error('Error updating group concerts', error)
    res.status(500).json({
      success: false,
      error: 'Server error while updating group'
    })
  }
})

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

// Apply error handler after all routes
app.use(errorHandler)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  })
})

// Start server
const server = app.listen(app.get('port'), () => {
  logger.success(`Marquee server listening on port ${app.get('port')}`)
  logger.info(`Access the app at: http://localhost:${app.get('port')}`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.warn('SIGTERM received, shutting down gracefully...')
  server.close(() => {
    logger.info('Server closed')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  logger.warn('SIGINT received, shutting down gracefully...')
  server.close(() => {
    logger.info('Server closed')
    process.exit(0)
  })
})

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', { reason, promise })
  process.exit(1)
})
