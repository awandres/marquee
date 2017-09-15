angular
.module('marquee')
.controller('loginCtrl', [
  '$state',
  'authentication',
  login
])

function login($state, authentication) {
  this.credentials = {
    username: '',
    password: ''
  }

  this.onSubmit = function() {
    authentication
    .login(this.credentials)
    .then(function() {
      $state.go('profile')
    })
  }
}
