angular
.module('marquee')
.controller('profileCtrl', [
  '$location',
  'userData',
  profile
])

function profile($location, userData) {
  this.user = {}

  userData.getProfile().success(function(data) {
    this.user = data
  })
  .error(function(err) {
    console.log(err)
  })
}
