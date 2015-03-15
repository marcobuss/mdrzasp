(function() {
  'use strict';

  angular
    .module('mdrzaspApp')
    .run(runBlock);

  runBlock.$inject = ['AuthService'];

  function runBlock(AuthService) {
    AuthService.initialize();
  };
})();
