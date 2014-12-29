'use strict';

var service = angular.module('authService', ['apiService']);

service.factory('AuthService', function (Session, Users, USER_ROLES) {
  var authService = {};

  authService.register = function (credentials) {
    return Users.register({
      email: credentials.email,
      password: credentials.password
    }).$promise;
  };

  authService.login = function (credentials) {
    var apiKey = '';
    var promise = Users.login({email: credentials.email, password: credentials.password}).$promise;

    promise.then(function (user) {
      console.log(user);
      Session.create(user.id, credentials.email, USER_ROLES.admin);
    }, function (error) {
      console.log(error);
    });

    return promise;
  };

  authService.isAuthenticated = function () {
    var result = !!Session.userId;
    return result;
  };

  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
  };

  return authService;
});

service.factory('Session', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };

  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };

  return this;
});
