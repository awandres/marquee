angular
  .module('marquee')
  .directive('navigation', [
    navigation
  ])

function navigation () {
  return {
    restrict: 'EA',
    templateUrl: '/assets/js/views/navigation.html',
    controller: 'navigationCtrl as navvm'
  }
}
