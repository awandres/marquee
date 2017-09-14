angular
.module('marquee')
.controller('loginCtrl', [
  '$location',
  'authentication',
  login
])

function login($location, authentication) {
  this.credentials = {
    username: '',
    password: ''
  }

  this.onSubmit = function() {
    authentication
    .login(this.credentials)
    .error(function(err) {
      alert(err)
    }).then(function() {
      $location.path('profile')
    })
  }
}
