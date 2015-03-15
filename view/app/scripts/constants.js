(function() {
  'use strict';

  var events = {
    changeSite: 'change-site'
  };

  var authEvents = {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized',
    authenticationNotRequired: 'auth-not-required'
  };

  var userRoles = {
    all: '*',
    admin: 'admin',
    user: 'user'
  };

  var categories = {
    'alternative': 'Alternative Sportarten',
    'bike': "Radfahren"
  };

  angular.module('mdrzaspApp')
    .constant('EVENTS', events)
    .constant('AUTH_EVENTS', authEvents)
    .constant('USER_ROLES', userRoles)
    .constant('CATEGORIES', categories);


})();
