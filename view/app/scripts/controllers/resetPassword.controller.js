(function () {
  'use strict';

  angular
    .module('mdrzaspApp')
    .controller('ResetPasswordCtrl', resetPassword);

  resetPassword.$inject = ['$scope', '$rootScope', 'AuthService', 'AUTH_EVENTS', '$routeParams', '$modal', 'Customer', 'ApplicationMessages'];

  function resetPassword($scope, $rootScope, AuthService, AUTH_EVENTS, $routeParams, $modal, Customer, ApplicationMessages) {
    var modalInstance;

    $scope.save = save;
    $scope.close = close;

    if (!AuthService.isAuthenticated()) {
      AuthService.temporaryLogin($routeParams.userId, $routeParams.accessToken);
      Customer.get({id: $routeParams.userId}, function(profile) {
        profile.passwordRepeat = null;
        $scope.profile = profile;
        showDialog();
      });

      $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
    }


    function showDialog() {
      modalInstance = $modal.open({
        templateUrl: 'views/profile.html',
        scope: $scope
      });
    }

    function save(profile) {
      profile.$save(function() {
        ApplicationMessages.addInfoMessage("Passwort wurde erfolgreich zurück gesetzt");
        close();
      }, function() {
        ApplicationMessages.addErrorMessage("Passwort konnte nicht zurück gesetzte werden. Bitte später noch einmal probieren");
        close();
      });
    }

    function close() {
      modalInstance.close();
    }
  }
})();
