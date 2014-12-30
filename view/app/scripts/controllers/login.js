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

    var emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    $scope.credentials = {
      email: '',
      password: ''
    };

    $scope.isLoginPage = true;

    $scope.registerNewUser = function (credentials) {
      if(!isCredentialsValid(credentials)) {
        return;
      }

      AuthService.register(credentials).then(function (user) {
          console.log(user);
          $scope.login(credentials).then(function (user) {
            $location.path('/');
          });
        }, function (error) {
          console.log(error);
          $scope.error = {
            email: 'Die angegebene E-Mail existiert bereits im System.'
          }
        });
    };

    var isCredentialsValid = function (credentials) {
      $scope.error = null;
      if(!credentials.email) {
        $scope.error = {
          email: 'Es muss eine E-Mail Adresse angegeben werden.'
        };
        return false;
      }

      if(!emailFilter.test(credentials.email)) {
        $scope.error = {
          email: 'keine gültige E-Mail Adresse'
        };
        return false;
      }

      if(credentials.email !== credentials.emailRepeat) {
        $scope.error = {
          emailRepeat: 'Die eingegebenen E-Mails unterscheiden sich.'
        };
        return false;
      }

      if(!credentials.password) {
        $scope.error = {
          password: 'Es muss ein Passwort eingegeben werden.'
        };
        return false;
      }

      if(credentials.password !== credentials.passwordRepeat) {
        $scope.error = {
          passwordRepeat: 'Passwort und Passwort (Wiederholung) sind nicht identisch.'
        };
        return false;
      }

      return true;
    }

    $scope.login = function(credentials) {
      var promise = AuthService.login(credentials)
      promise.then(function (user) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);
      }, function() {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        $scope.error = {
          credentials : 'Benutzername oder Passwort falsch.'
        }
      });

      return promise;
    };
  });
