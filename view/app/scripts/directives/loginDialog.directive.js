(function() {
  'use strict';

  angular
    .module('mdrzaspApp')
    .directive('loginDialog', loginDialog);

  loginDialog.$inject = ['AUTH_EVENTS'];

  function loginDialog(AUTH_EVENTS) {
    var directive = {
      restrict: 'A',
      template: '<div ng-if="showLogin" ng-include="\'views/login-form.html\'">',
      link: link
    };

    return directive;

    function link(scope) {
      scope.visible = false;
      scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
      scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
      scope.$on(AUTH_EVENTS.loginSuccess, hideDialog);
      scope.$on(AUTH_EVENTS.authenticationNotRequired, hideDialog);

      function showDialog() {
        scope.showLogin = true;
      };

      function hideDialog() {
        scope.showLogin = false;
      };
    }
  }
})();
