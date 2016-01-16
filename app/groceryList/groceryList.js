'use strict';

angular.module('groceryList.groceryList', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/groceryList', {
    templateUrl: 'groceryList/groceryList.html',
    controller: 'GroceryListCtrl'
  });
}])

.run(function($location) {
  var ref = new Firebase('https://thegrocerylist.firebaseio.com/');

  if(ref.getAuth() === null) {
    $location.path("/login");
  }
})

.controller('GroceryListCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  var ref = new Firebase('https://thegrocerylist.firebaseio.com/groceries');

  $scope.userId = ref.getAuth().uid;
  $scope.groceries = $firebaseArray(ref.orderByChild('userId').equalTo($scope.userId));
  $scope.addFormShow = true;

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
      description: description,
      bought: false,
      userId: $scope.userId
    }).then(function(ref){

      // Clear Form
      clearFields();

      // Send Message
      $scope.msg = "Item Added";
    });
  }

  $scope.editFormSubmit = function(){
    console.log('Updating Grocery...');

    var id = $scope.id;
    var record = $scope.groceries.$getRecord(id);

    record.name = $scope.name;
    record.amount = $scope.amount;
    record.description = $scope.description;

    $scope.groceries.$save(record).then(function(ref){
      console.log(ref.key);
    });

    clearFields();

    // Hide Form
    $scope.editFormShow = false;
    $scope.addFormShow = true;

    $scope.msg = "Grocery Updated";
  }

  $scope.showEditForm = function(grocery){
    $scope.editFormShow = true;
    $scope.addFormShow = false;

    $scope.id = grocery.$id;
    $scope.name = grocery.name;
    $scope.amount = (grocery.amount) ? grocery.amount : null;
    $scope.description = (grocery.description) ? grocery.description : null;
  }

  function clearFields(){
    console.log('Clearing All Fields...');

    $scope.name = '';
    $scope.amount = '';
    $scope.description = '';
  }

  $scope.bought = function(id){
    var record = $scope.groceries.$getRecord(id);

    record.bought = (record.bought == true ? false : true);

    $scope.groceries.$save(record).then(function(ref){
      console.log(record.name + " bought!");
    });
  }

  $scope.removeGrocery = function(grocery){
    console.log('Removing Grocery');

    $scope.groceries.$remove(grocery);

    $scope.msg="Grocery Removed";
  }

  $scope.clearPurchased = function(){
    console.log('Clearing purchased');

    $scope.groceries = $scope.groceries.filter(function(grocery) {
      if (grocery.bought) {
        $scope.groceries.$remove(grocery);
      }
    });

    $scope.msg="Cleared purchased";
  }

}]);
