angular
.module('marquee')
.controller('registerCtrl', [
  '$location',
  'authentication',
  register
])

function register($location, authentication) {
  this.credentials = {
    username: '',
    password: ''
  }

  this.onSubmit = function() {
    authentication
      .register(this.credentials)
      .error(function(err) {
        alert(err)
      }).then(function() {
        $location.path('profile')
      })
  }
}
