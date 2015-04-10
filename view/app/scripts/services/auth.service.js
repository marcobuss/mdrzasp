(function() {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthService', authService);

  authService.$inject = [
    'Session', 'Customer', 'USER_ROLES', '$q', '$route',
    '$rootScope', 'AUTH_EVENTS', 'LoopBackAuth'
  ];

  function authService(Session, Customer, USER_ROLES, $q, $route, $rootScope, AUTH_EVENTS, LoopBackAuth) {
    return {
      register: register,
      login: login,
      logout: logout,
      isAuthenticated: isAuthenticated,
      isAuthorized: isAuthorized,
      initialize: initialize,
      resetPassword: resetPassword,
      temporaryLogin: temporaryLogin
    };

    function resetPassword(email) {
      return Customer.resetPassword({}, {email: email}).$promise;
    }

    function register(credentials) {
      return Customer.create({
        email: credentials.email,
        password: credentials.password,
        username: credentials.username
      }).$promise;
    }

    function temporaryLogin(userId, accessToken) {
      LoopBackAuth.setUser(accessToken, userId);
      LoopBackAuth.save();
    }

    function login(credentials) {
      return $q(function (resolve, reject) {
        Customer.login({email: credentials.email, password: credentials.password}).$promise
          .then(function (user) {
            Session.create(user.id, user.userId, USER_ROLES.admin);

            return Customer.get({id: Session.userId}).$promise;
          }, function (error) {
            reject(error);
          }).then(function (user) {
            resolve(user);
          });
      });
    }

    function logout() {
      Customer.logout();
      Session.destroy();
    }

    function isAuthenticated() {
      var result = !!Session.userId;
      return result;
    }

    function isAuthorized(authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
    }

    function initialize() {
      $rootScope.$on('$routeChangeStart', function (event, next) {
        if (next.data) {
          var authorizedRoles = next.data.authorizedRoles;
          if (!isAuthorized(authorizedRoles)) {
            event.preventDefault();
            if (isAuthenticated()) {
              $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            } else {
              $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }
          }
        } else {
          $rootScope.$broadcast(AUTH_EVENTS.authenticationNotRequired);
        }
      });

      $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
        $route.reload();
      });
    }
  }

})();
