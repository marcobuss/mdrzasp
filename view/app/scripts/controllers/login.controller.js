(function () {
  'use strict';

  angular
    .module('mdrzaspApp')
    .controller('LoginCtrl', login);

  login.$inject = ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', '$modal', 'ApplicationMessages'];

  function login($scope, $rootScope, AUTH_EVENTS, AuthService, $modal, ApplicationMessages) {
    var credentials = {
      email: '',
      password: ''
    };

    $scope.isLoginPage = true;
    $scope.credentials = credentials;

    $scope.registerNewUser = registerNewUser;
    $scope.login = login;
    $scope.resetPassword = resetPassword;
    $scope.showPasswordResetRequestDialog = showPasswordResetRequestDialog;
    $scope.close = close;

    function resetPassword(profile) {
      AuthService.resetPassword(profile.email).then( function(success) {
          modalInstance.close();
          ApplicationMessages.addInfoMessage("EMail wurde versendet. Bitte den Anweisungen in der EMail folgen.");
        }, function() {
          modalInstance.close(error);
          ApplicationMessages.addErrorMessage("Email konnte nicht versendet werden. Bitte später versuchen.");
        });
    }

    function registerNewUser(credentials) {
      if (!isCredentialsValid(credentials)) {
        return;
      }

      AuthService.register(credentials).then(function (user) {
        console.log(user);

        $scope.success = {
          register: 'Registrierung erfolgreich. Du erhälst eine E-Mail mit der die Registrierung abgeschlossen werden kann.'
        }
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

    var modalInstance;
    function showPasswordResetRequestDialog() {
      modalInstance = $modal.open({
        templateUrl: 'views/reset-request.html',
        scope: $scope
      });
    }

    function close() {
      modalInstance.close();
    }
  }
})();
