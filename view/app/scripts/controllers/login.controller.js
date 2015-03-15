(function () {
  'use strict';

  angular
    .module('mdrzaspApp')
    .controller('LoginCtrl', login);

  login.$inject = ['$scope', '$rootScope', '$location', 'AUTH_EVENTS', 'AuthService'];

  function login($scope, $rootScope, $location, AUTH_EVENTS, AuthService) {
    var emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var credentials = {
      email: '',
      password: ''
    };

    $scope.isLoginPage = true;
    $scope.credentials = credentials;
    $scope.registerNewUser = registerNewUser;
    $scope.login = login;

    function registerNewUser(credentials) {
      if (!isCredentialsValid(credentials)) {
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
    }

    function isCredentialsValid(credentials) {
      $scope.error = null;

      if (credentials.email !== credentials.emailRepeat) {
        $scope.error = {
          emailRepeat: 'Die eingegebenen E-Mails unterscheiden sich.'
        };
        return false;
      }

      if (credentials.password !== credentials.passwordRepeat) {
        $scope.error = {
          passwordRepeat: 'Passwort und Passwort (Wiederholung) sind nicht identisch.'
        };
        return false;
      }

      return true;
    }

    function login(credentials) {
      return AuthService.login(credentials).
        then(function (user) {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $scope.setCurrentUser(user);
        }, function () {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          $scope.error = {
            credentials: 'Benutzername oder Passwort falsch.'
          }
        });
    }
  }
})();
