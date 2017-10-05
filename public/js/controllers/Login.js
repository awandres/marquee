angular
.module('marquee')
.controller('loginCtrl', [
  '$state',
  'authentication',
  'SearchFactory',
  'UserFactory',
  login
])

function login($state, authentication, SearchFactory, UserFactory) {
  this.currentUserName = localStorage.getItem('currentUserName')
  this.users = UserFactory.query()
  this.setUser = SearchFactory.setUser
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
