angular
.module('marquee')
.controller('Search', [
  'SearchFactory',
  SearchFunction
])

function SearchFunction(SearchFactory) {
  const $ = angular.element

  this.results = SearchFactory.get().$promise.then((response) => {
    console.log(response._embedded.events)
    return response._embedded.events
  })
  console.log(this.results)

  // this.searches = $.ajax({
  //   url: 'https://app.ticketmaster.com/discovery/v2/events.json?keyword=bruno&apikey=VVBGfqBjSA4GcA9GCIhVCDxyYkJtCeA7',
  //   type: 'get',
  //   dataType: 'json'
  // }).then((response) => {
  //   console.log(response._embedded.events)
  //   return response._embedded.events
  // })
  //

}
