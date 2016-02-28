'use strict';

angular.module('user.signUp', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'user/signUp.html',
    controller: 'SignUpCtrl'
  });
}])

.controller('SignUpCtrl', ['$scope', '$firebaseArray', '$location', function($scope, $firebaseArray, $location) {
  var ref = new Firebase('https://thegrocerylist.firebaseio.com/');


  $scope.signUpFormSubmit = function(){
    if (!checkPassword($scope.password)) {
      signUpFailed();
      return;
    };
    ref.createUser({
      email    : $scope.email,
      password : $scope.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        ref.authWithPassword({
          email    : $scope.email,
          password : $scope.password
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!");
          } else {
            $scope.$apply(function() { $location.path("/groceryList"); });
          }
        });

      }
    });
  }

  function checkPassword(password){
    if (password.length < 7){
      return false;
    }
  }

  function signUpFailed(){
    $scope.msg = "Password less than 7 characters";
    clearForm();
  }

  function clearForm(){
    $scope.password = '';
  }

}]);
