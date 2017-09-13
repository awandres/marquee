angular.module('marquee')
.factory('SearchFactory', [
  '$resource',
  SearchFactory
])

function SearchFactory($resource) {
  return $resource('https://app.ticketmaster.com/discovery/v2/events.json?keyword=bruno&apikey=VVBGfqBjSA4GcA9GCIhVCDxyYkJtCeA7', {
    update: {method: 'PUT'}
  })
}
