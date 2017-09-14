angular
    .module('arquee')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','authentication'];
  function navigationCtrl($location, authentication) {

    this.isLoggedIn = authentication.isLoggedIn();

    this.currentUser = authentication.currentUser();

  }
