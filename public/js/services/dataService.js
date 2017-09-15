angular
.module('marquee')
.factory('userData', [
  '$http',
  'authentication',
  userData
])

function userData($http, authentication) {

  var getProfile = function() {
    return $http.get('/api/profile', {
      headers: {
        Authorization: 'Bearer '+ authentication.getToken()
      }
    })
  }

  return {
    getProfile: getProfile
  }
}
