// server.js

// modules =================================================
const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const User = require('./db/schema.js')
const jwt = require('express-jwt')
const auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
})
const ctrlProfile = require('./apiControllers/profile');
const ctrlAuth = require('./apiControllers/authentication');
const config = ('./config/passport')


app.set('port', process.env.PORT || 8080)
app.use('/assets', express.static('public'))
app.use('/node_modules', express.static('node_modules'))
app.use(bodyParser.json({extended:true}))
app.use(passport.initialize())


app.get('/profile', auth, ctrlProfile.profileRead);

app.post('/register', ctrlAuth.register);
app.post('/login', ctrlAuth.login);


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
