'use strict';

angular.module('groceryList.groceryList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/groceryList', {
    templateUrl: 'groceryList/groceryList.html',
    controller: 'GroceryListCtrl'
  });
}])

.controller('GroceryListCtrl', [function() {

}]);
