angular
.module('marquee')
.controller('UsersIndex', [
  'UserFactory',
  IndexControllerFn
])

function IndexControllerFn(UserFactory) {
  console.log('at index')
  this.users = UserFactory.query()
  console.log(this.users)
}
