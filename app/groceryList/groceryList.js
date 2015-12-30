'use strict';

angular.module('groceryList.groceryList', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/groceryList', {
    templateUrl: 'groceryList/groceryList.html',
    controller: 'GroceryListCtrl'
  });
}])

.controller('GroceryListCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  var ref = new Firebase('https://thegrocerylist.firebaseio.com/groceries');

  $scope.groceries = $firebaseArray(ref);

  $scope.addFormSubmit = function(){
    console.log('Adding Grocery...');

    // Assign Values
    if($scope.name){ var name = $scope.name } else { var name = null; }
    if($scope.amount){ var amount = $scope.amount; } else { var amount = null; }
    if($scope.description){ var description = $scope.description; } else { var description = null; }

    // Build Object
    $scope.groceries.$add({
      name: name,
      amount: amount,
      description: description
    }).then(function(ref){

      // Clear Form
      clearFields();

      // Send Message
      $scope.msg = "Item Added";
    });
  }

  function clearFields(){
    console.log('Clearing All Fields...');

    $scope.name = '';
    $scope.amount = '';
    $scope.description = '';
  }
}]);
