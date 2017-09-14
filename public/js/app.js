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
  Router
])
.run([
  '$rootScope',
  '$location',
  'authentication',
  run
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
  $urlRouterProvider.otherwise('/')
}

function run($rootScope, $location, authentication) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if($location.path() === '/profile' && !authentication.isLoggedIn()) {$location.path('/')}
  })
}
