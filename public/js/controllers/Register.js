angular
.module('marquee')
.controller('registerCtrl', [
  '$state',
  'authentication',
  register
])

function register($state, authentication) {
  this.credentials = {
    username: '',
    password: ''
  }

  this.onSubmit = function() {
    console.log(this.credentials)
    authentication
      .register(this.credentials)
      .then(function() {
        $state.go('profile')
      })
  }
}
