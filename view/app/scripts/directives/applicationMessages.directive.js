(function () {
  'use strict';

  angular
    .module('mdrzaspApp')
    .directive('applicationMessages', applicationMessages);

  function applicationMessages() {
    var dirctive = {
      restrict: 'E',
      controller: ApplicationMessagesController ,
      template: '<div ng-include="\'views/messages.html\'">'
    };

    return dirctive;
  }

  ApplicationMessagesController.$inject = ['$scope', 'ApplicationMessages'];

  function ApplicationMessagesController($scope, ApplicationMessages) {

    $scope.errorMessages = ApplicationMessages.errorMessages;
    $scope.infoMessages = ApplicationMessages.infoMessages;

  }
})();
