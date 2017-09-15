angular.module('marquee')
.factory('GroupFactory', [
  '$resource',
  GroupFactory
])
// .factory('SearchFactory', [
//   '$resource',
//   SearchFactory
// ])

function GroupFactory($resource) {
  return $resource('/api/groups/:id', null, {
    update: {method: 'PUT'}
  })
}
