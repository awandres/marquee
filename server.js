// server.js

// modules =================================================
require('dotenv').config()
console.log(process.env.TOKEN)

const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const path = require('path')
// const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const User = require('./db/schema.js')
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
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.json({extended:true}))
app.use(passport.initialize())


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')


app.get('/api/profile', auth, ctrlProfile.profileRead);

app.post('/api/register', ctrlAuth.register);
app.post('/api/login', ctrlAuth.login);


app.get('/api/users', (req, res) => {
  User.find({}, null).then((users) => {
    res.json(users)
  })
})

app.put('/api/users', (req, res) => {
  console.log(req.body)
  User.findOneAndUpdate({ _id: '59bacf1f56b3243aca9e846c' }, {"$push" : {"concerts": req.body}}, {new: true}).then((user) => {
    console.log(user)
    res.status(200).json(user)
  })
})

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})
