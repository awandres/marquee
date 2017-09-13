console.log('linked')
/* global angular */
angular.module('marquee', [
  'ui.router',
  'ngResource'
])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  Router
])

function Router($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('usersIndex', {
      url: '/',
      controller: 'UsersIndex',
      controllerAs: 'vm',
      templateUrl: 'assets/js/views/UsersIndex.html'
    })
    .state('search', {
      url: '/search',
      controller: 'Search',
      controllerAs: 'vm',
      templateUrl: 'assets/js/views/Search.html'
    })

  $urlRouterProvider.otherwise('/')
}
