(function() {
  'use strict';

  angular
    .module('mdrzaspApp')
    .factory('ApplicationMessages', applicationMessages);

  applicationMessages.$inject = ['$rootScope', '$timeout'];

  function applicationMessages($rootScope, $timeout) {
    var errorMessages = [];
    var infoMessages = [];

    return {
      addErrorMessage: addErrorMessage,
      addInfoMessage: addInfoMessage,
      errorMessages: errorMessages,
      infoMessages: infoMessages
    };

    function addErrorMessage(message) {
      errorMessages.unshift(message);

      $timeout(function() {
        errorMessages.pop();
      }, 5000);
    }

    function addInfoMessage(message) {
      infoMessages.unshift(message);

      $timeout(function() {
        infoMessages.pop();
      }, 5000);
    }
  }
})();
