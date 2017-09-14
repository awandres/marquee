// server.js

// modules =================================================
const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');

const User = require('./db/schema.js')

app.set('port', process.env.PORT || 8080)
app.use('/assets', express.static('public'))
app.use('/node_modules', express.static('node_modules'))
app.use(bodyParser.json({extended:true}))

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
