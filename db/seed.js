const userData = require('./seeds.json')
const User = require('./schema.js')

User.remove({}).then(function(){
  userData.forEach(function(user) {
    User.create({
      username: user.username,
      concerts: user.concerts,
      hash: user.hash,
      salt: user.salt
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
