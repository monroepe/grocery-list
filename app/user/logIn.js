'use strict';

angular.module('user.logIn', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'user/logIn.html',
    controller: 'LogInCtrl'
  });
}])

.controller('LogInCtrl', ['$scope', '$firebaseArray', '$location', function($scope, $firebaseArray, $location) {
  var ref = new Firebase('https://thegrocerylist.firebaseio.com/');


  $scope.logInFormSubmit = function(){
    ref.authWithPassword({
      email    : $scope.email,
      password : $scope.password
    }, function(error, authData) {
      $scope.msg = "Authentication Failed";
      if (error) {
        loginFailed();
      } else {
        console.log("Authenticated successfully");
        $scope.$apply(function() { $location.path("/groceryList"); });
      }
    });
  }

  function loginFailed(){
    $scope.msg = "Authentication Failed";
    console.log("Login Failed!");
    clearForm();
  }

  function clearForm(){
    $scope.password = '';
    $scope.$apply();
  }

}]);
