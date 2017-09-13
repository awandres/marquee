angular
.module('marquee')
.controller('Search', [
  'SearchFactory',
  'logic',
  '$http',
  SearchFunction
])

function SearchFunction(SearchFactory, logic, $http) {
  const $ = angular.element

    // this.results = logic.search()
    // console.log(this.results)
    // console.log(logic.search())
    //

    // this.results = SearchFactory.then((response) => {return response})
    // console.log(this.results)


    this.results = []
    this.searchArtist = function(keyword) {
      console.log(keyword)
       $http({
        method: 'GET',
        url: `https://app.ticketmaster.com/discovery/v2/events.json?keyword=` + keyword + `&apikey=VVBGfqBjSA4GcA9GCIhVCDxyYkJtCeA7`
        }).then((response) => {
          console.log(response.data._embedded.events)
          this.results = response.data._embedded.events
          console.log(this.results)

      })
      // return this.results
    }

  //   this.keyword = 'Dan'
  //   console.log(this.keyword)
  //
  // this.results = SearchFactory.get().$promise.then((response) => {
  //   console.log(this.keyword)
  //   console.log(response._embedded.events)
  //   this.results = response._embedded.events
  //   return response._embedded.events
  // })
  // console.log(this.results)

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
