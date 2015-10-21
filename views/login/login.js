'use strict';

angular.module('nibble.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', [function($rootScope) {

}]);