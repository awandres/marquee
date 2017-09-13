angular.module('marquee')
.factory('UserFactory', [
  '$resource',
  UserFactory
])
.factory('SearchFactory', [
  '$resource',
  SearchFactory
])

function UserFactory($resource) {
  return $resource('/api/users/:id', null, {
    update: {method: 'PUT'}
  })
}

function SearchFactory($resource) {
  return $resource('https://app.ticketmaster.com/discovery/v2/events.json?keyword=bruno&apikey=VVBGfqBjSA4GcA9GCIhVCDxyYkJtCeA7', {
    update: {method: 'PUT'}
  })
}
