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
  this.currentUserName = localStorage.getItem('currentUserName')
  console.log( this.currentUserName)
  this.setUser = SearchFactory.setUser
  console.log(currentUserName)
  console.log(this.groups)
  this.currentUserObject = $http({
    method: 'GET',
    url: '/api/users/' + this.currentUserName
  }).then((response) => {this.currentUserObject = response; console.log(response)})



  console.log(this.currentUserObject)
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
        url: '/api/users/'+ this.currentUserObject.data[0].username + '/groups',
        data: {groups: group}

      }).then((response) => {console.log(response)})
    )
  }



  }
