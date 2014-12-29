'use strict';

/**
 * @ngdoc function
 * @name mdrzasp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the mdrzasp App
 */
angular.module('mdrzaspApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, AUTH_EVENTS, AuthService) {

    $scope.credentials = {
      email: '',
      password: ''
    };

    $scope.isLoginPage = true;

    $scope.registerNewUser = function (credentials) {
      AuthService.register(credentials).then(function (user) {
          console.log(user);
        }, function (error) {
          console.log(error);
        });
    };

    $scope.login = function(credentials) {
      AuthService.login(credentials).then(function (user) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);

      }, function() {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };
  });
