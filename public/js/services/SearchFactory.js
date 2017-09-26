angular.module('marquee')
.factory('SearchFactory', [
  // '$resource',
  '$http',
  SearchFactory
])

function SearchFactory($http) {

//   console.log(this.keyword)
//   return $resource('https://app.ticketmaster.com/discovery/v2/events.json?keyword=:keyword&apikey=VVBGfqBjSA4GcA9GCIhVCDxyYkJtCeA7', {
//     update: {method: 'PUT'},
//     keyword: this.keyword
//   })
//   console.log(this.keyword)
//
// }
// console.log(this.keyword)

//
// function SearchFactory($http) {
//
//    $http({
//     method: 'GET',
//     url: `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&apikey=VVBGfqBjSA4GcA9GCIhVCDxyYkJtCeA7`
//     }).then((response) => {
//       console.log(response.data._embedded.events)
//       this.results = response.data._embedded.events
//       console.log(this.results)
//
//   })
//   return this.results
// }

this.searchEvents = function(keyword) {
  return (
  $http({
 method: 'GET',
 url: `https://app.ticketmaster.com/discovery/v2/events.json?keyword=` + keyword + `&apikey=VVBGfqBjSA4GcA9GCIhVCDxyYkJtCeA7`
 })
 )
}
// this.currentUserName = ''

this.setUser = function(name) {
  this.currentUserName = name
  console.log(this.currentUserName)
  return this.currentUserName
}

return {
  searchEvents: this.searchEvents,
  setUser: this.setUser,
  currentUserName: this.currentUserName
}

}
