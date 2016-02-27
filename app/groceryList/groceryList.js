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
    if($scope.name){ var name = $scope.name } else { var name = null; }
    if($scope.description){ var description = $scope.description; } else { var description = null; }

    $scope.groceries.$add({
      name: name,
      bought: false,
      userId: $scope.userId
    }).then(function(ref){

    clearFields();
    $scope.msg = "Item Added";
    });
  }

  $scope.editFormSubmit = function(){
    var id = $scope.id;
    var record = $scope.groceries.$getRecord(id);

    record.name = $scope.name;
    $scope.groceries.$save(record);

    clearFields();
    $scope.editFormShow = false;
    $scope.addFormShow = true;
    $scope.msg = "Grocery Updated";
  }

  $scope.showEditForm = function(grocery){
    $scope.editFormShow = true;
    $scope.addFormShow = false;

    $scope.id = grocery.$id;
    $scope.name = grocery.name;
  }

  function clearFields(){
    $scope.name = '';
  }

  $scope.bought = function(id){
    var record = $scope.groceries.$getRecord(id);
    record.bought = (record.bought == true ? false : true);
    $scope.groceries.$save(record);
  }

  $scope.removeGrocery = function(grocery){
    $scope.groceries.$remove(grocery);
    $scope.msg="Grocery Removed";
  }

  $scope.clearPurchased = function(){
    $scope.groceries = $scope.groceries.filter(function(grocery) {
      if (grocery.bought) {
        $scope.groceries.$remove(grocery);
      }
    });

    $scope.msg="Cleared purchased";
  }

}]);
