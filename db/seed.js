const userData = require('./seeds.json')
const groupData = require('./groupSeed.json')
const User = require('./schema.js').User
const Group = require('./schema.js').Group

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

Group.remove({}).then(function(){
  groupData.forEach(function(group) {
    Group.create({
      groupname: group.groupname,
      concerts: group.concerts,

    })
      .then((newGroup) => {
        console.log(newGroup)
      })
      .catch((err) => {
        console.log(err)
      })

  })
  .then(() => {
    process.exit()
  })
})
