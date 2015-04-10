(function() {
  'use strict';

  angular
    .module('mdrzaspApp')
    .controller('ApplicationController', applicationController);

  applicationController.$inject = [
    '$scope', '$rootScope', '$location', '$route', 'USER_ROLES', 'AuthService'
  ];

  function applicationController($scope, $rootScope, $location, $route, USER_ROLES, AuthService) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;

    $scope.isAuthorized = function() {
      return AuthService.isAuthenticated();
    }

    $scope.setCurrentUser = function (user) {
      $scope.currentUser = user;
    };

    $scope.goTo = function(path) {
      $location.path(path);
    };

    $scope.logout = function() {
      $location.path('/');
      $scope.currentUser = null;
      AuthService.logout();
      $route.reload();
    };



    $rootScope.$on('$routeChangeSuccess', function(event, next) {
      $scope.path = next.originalPath;
    });
  }
})();
