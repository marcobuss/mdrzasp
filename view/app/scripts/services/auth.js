'use strict';

var service = angular.module('authService', ['apiService']);

service.factory('AuthService', function (Session, Users, USER_ROLES, $http, $q) {
  var authService = {};

  authService.register = function (credentials) {
    return Users().register({
      email: credentials.email,
      password: credentials.password
    }).$promise;
  };

  authService.login = function (credentials) {

    return $q(function (resolve, reject) {
      Users().login({email: credentials.email, password: credentials.password}).$promise
        .then(function (user) {
          Session.create(user.id, user.userId, USER_ROLES.admin);

          return Users(Session.id).get({id: Session.userId}).$promise;
        }, function (error) {
          reject(error);
        }).then(function (user) {
          resolve(user);
        });
    });
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
