angular
.module('marquee')
.controller('UsersIndex', [
  'UserFactory',
  'GroupFactory',
  '$http',
  IndexControllerFn
])

function IndexControllerFn(UserFactory, GroupFactory, $http) {
  console.log('at index')
  this.users = UserFactory.query()
  this.groups = GroupFactory.query()
  this.groupTo = ''
  console.log(this.users)

  this.addToGroup = function(name, venue, groupTo) {
    console.log(name)
    console.log(groupTo)
    return(
      $http({
        method: 'PUT',
        url: '/api/groups/'+ groupTo,
        data: {name: name, venue: venue}

      }).then((response) => {console.log(response)})
    )
  }
}
