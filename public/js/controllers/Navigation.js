angular
    .module('marquee')
    .controller('navigationCtrl', [
      '$location',
      'authentication',
      navigationCtrl
    ])

  function navigationCtrl($location, authentication) {

    this.isLoggedIn = authentication.isLoggedIn();

    this.currentUser = authentication.currentUser();

  }
