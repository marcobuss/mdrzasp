'use strict';

/**
 * @ngdoc overview
 * @name mdrzaspApp
 * @description
 * # mdrzaspApp
 *
 * Main module of the application.
 */
angular
  .module('mdrzaspApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restService',
    'authService',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, $httpProvider, USER_ROLES) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
        }
      })
      .when('/addentry', {
        templateUrl: 'views/addEntry.html',
        controller: 'AddEntryCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
        }
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'LoginCtrl'
      })
      .when('/ranking', {
        templateUrl: 'views/ranking.html',
        controller: 'RankingCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
        }
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.interceptors.push(function($q, $rootScope, AUTH_EVENTS) {
      return {
        responseError: function(rejection) {
          if (rejection.status == 401) {
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          }
          return $q.reject(rejection);
        }
      };
    });
  })
  .run(function ($rootScope, $route, AUTH_EVENTS, EVENTS, AuthService) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if (next.data) {
        var authorizedRoles = next.data.authorizedRoles;
        if (!AuthService.isAuthorized(authorizedRoles)) {
          event.preventDefault();
          if (AuthService.isAuthenticated()) {
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          } else {
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          }
        }
      } else {
        $rootScope.$broadcast(AUTH_EVENTS.authenticationNotRequired);
      }
    });

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event) {
      $route.reload();
    });
  })
  .controller('ApplicationController', function ($scope, $rootScope, $location, $route, USER_ROLES, AuthService) {
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
      $scope.currentUser = null;
      AuthService.logout();
      $route.reload();
    }

    $rootScope.$on('$routeChangeSuccess', function(event, next) {
      $scope.path = next.originalPath;
    });
  })
  .constant('EVENTS', {
    changeSite: 'change-site'
  })
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized',
    authenticationNotRequired: 'auth-not-required'
  })
  .constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    user: 'user'
  });
