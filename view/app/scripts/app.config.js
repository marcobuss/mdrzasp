(function() {
  'use strict';

  angular.module('mdrzaspApp')
    .config(Config);

  Config.$inject = ['$routeProvider', '$httpProvider', 'USER_ROLES'];

  function Config($routeProvider, $httpProvider, USER_ROLES) {
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
          if (rejection.status === 401) {
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          }
          return $q.reject(rejection);
        }
      };
    });
  };

})();
