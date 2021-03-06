console.log('linked')

/* global angular */
angular.module('marquee', [
  'ui.router',
  'ngResource',
  'ngMaterial'
])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  Router
])
// .run([
//   '$rootScope',
//   '$location',
//   'authentication',
//   run
// ])



function Router($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('users', {
      url: '/users',
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
    .state('login', {
      url: '/login',
      controller: 'loginCtrl',
      controllerAs: 'vm',
      templateUrl: 'assets/js/views/login.html'
    })
    .state('register', {
      url: '/register',
      controller: 'registerCtrl',
      controllerAs: 'vm',
      templateUrl: 'assets/js/views/Register.html'
    })
    .state('profile', {
      url: '/profile',
      controller: 'profileCtrl',
      controllerAs: 'vm',
      templateUrl: 'assets/js/views/profile.html'
    })
    .state('groups', {
      url: '/groups',
      controller: 'UsersIndex',
      controllerAs: 'vm',
      templateUrl: 'assets/js/views/GroupsIndex.html'
    })
  $urlRouterProvider.otherwise('/search')
  $locationProvider.html5Mode(true)

}
