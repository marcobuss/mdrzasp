'use strict';

angular.module('mdrzaspApp').directive('profileDialog', function () {
  return {
    restrict: 'E',

    controller: function ($scope, $element, Customer, Session, $modal, $route) {

      var modalInstance;

      function loadProfile() {
        $scope.profile = Customer.findById({id: Session.userId},
          function (profile) {
          },
          function (error) {
            console.log(error);
          });
      };

      function close(reload) {
        modalInstance.close();
        if(reload) {
          $route.reload();
        }
      }

      $scope.save = function (profile) {
        profile.$save(function (success) {
          close(true);
        }, function (error) {
          console.log(error);
        });

      };

      $scope.close = close;

      $scope.showProfileDialog = function () {
        loadProfile();
        modalInstance = $modal.open({
          templateUrl: 'views/profile.html',
          scope: $scope
        });
      };

    }
  };
});


