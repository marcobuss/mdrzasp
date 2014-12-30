'use strict';

angular.module('mdrzaspApp').directive('loginDialog', function (AUTH_EVENTS) {
  return {
    restrict: 'A',
    template: '<div ng-if="showLogin" ng-include="\'views/login-form.html\'">',
    link: function (scope) {
      var showDialog = function () {
        scope.showLogin = true;
      };

      var hideDialog = function () {
        scope.showLogin = false;
      };

      scope.visible = false;
      scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
      scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
      scope.$on(AUTH_EVENTS.loginSuccess, hideDialog);
    }
  };
});
