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
    ref.createUser({
      email    : $scope.email,
      password : $scope.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);

        ref.authWithPassword({
          email    : $scope.email,
          password : $scope.password
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully");
            $scope.$apply(function() { $location.path("/groceryList"); });
          }
        });

      }
    });
  }

}]);
