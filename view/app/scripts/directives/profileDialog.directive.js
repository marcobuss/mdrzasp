(function () {
  'use strict';

  angular
    .module('mdrzaspApp')
    .directive('profileDialog', profileDialog);

  function profileDialog() {
    var directive = {
      restrict: 'E',
      controller: ProfileController
    };

    return directive;
  }

  ProfileController.$inject = ['$scope', 'Customer', 'Session', '$modal', '$route'];

  function ProfileController($scope, Customer, Session, $modal, $route) {
    var modalInstance;

    $scope.close = close;
    $scope.save = save;
    $scope.showProfileDialog = showProfileDialog;

    function close(reload) {
      modalInstance.close();
      if (reload) {
        $route.reload();
      }
    }

    function save(profile) {
      profile.$save(function (success) {
        $scope.currentUser = success;
        close(true);
      }, function (error) {
        console.log(error);
      });
    }

    function showProfileDialog() {
      loadProfile();
      modalInstance = $modal.open({
        templateUrl: 'views/profile.html',
        scope: $scope
      });
    }

    function loadProfile() {
      Customer.findById({id: Session.userId},
        function (profile) {
          profile.passwordRepeat = null;
          $scope.profile = profile;
       },
        function (error) {
          console.log(error);
        });
    }

  }
})();
