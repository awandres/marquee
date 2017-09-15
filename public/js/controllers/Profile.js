angular
.module('marquee')
.controller('profileCtrl', [
  '$state',
  'userData',
  profile
])

function profile($state, userData) {
  this.user = {}

  userData.getProfile().then(function(data) {
    console.log(data)
    this.user = data
  })
  .catch(function(err) {
    console.log(err)
  })
}
