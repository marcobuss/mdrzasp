(function() {
  'use strict';

  angular
    .module('app.auth')
    .factory('Session', session);

  function session() {
    //this.showLoginDialog;

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
  }
})();
