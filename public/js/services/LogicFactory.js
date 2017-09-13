angular
.module('marquee')
.factory('logic', [
  '$stateParams',
  '$resource',
  'SearchFactory',
  logicService
])

function logicService($stateParams, $resource, SearchFactory) {

  return{
    search:search
  }

  function search() {
      SearchFactory.get().$promise.then((response) => {
      console.log(response._embedded.events)
      return response._embedded.events
    })
  }

}
