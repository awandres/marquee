angular
.module('marquee')
.controller('UsersIndex', [
  'UserFactory',
  'GroupFactory',
  '$http',
  'SearchFactory',
  IndexControllerFn
])

function IndexControllerFn(UserFactory, GroupFactory, $http, SearchFactory) {
  console.log('at index')
  this.users = UserFactory.query()
  this.groups = GroupFactory.query()
  this.groupTo = ''
  console.log(this.users)
  this.currentUserName = SearchFactory.currentUserName
  console.log( this.currentUserName)
  this.setUser = SearchFactory.setUser


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

  this.joinGroup = function(group) {
    console.log(group)
    console.log(this.currentUserName)
    return(
      $http({
        method: 'PUT',
        url: '/api/users/'+ this.currentUserName + '/groups',
        data: {groups: group}

      }).then((response) => {console.log(response)})
    )
  }
  }
