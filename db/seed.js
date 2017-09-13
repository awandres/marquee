const userData = require('./seeds.json')
const User = require('./schema.js')

User.remove({}).then(function(){
  userData.forEach(function(user) {
    User.create({
      name: user.name,
      concert: user.concert
    })
      .then((newUser) => {
        console.log(newUser)
      })
      .catch((err) => {
        console.log(err)
      })
  })
  .then(() => {
    process.exit()
  })
})
