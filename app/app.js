'use strict';

// Declare app level module which depends on views, and components
angular.module('groceryList', [
  'ngRoute',
  'firebase',
  'groceryList.groceryList',
  'user.signUp',
  'user.logIn'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/groceryList'});
}]);
