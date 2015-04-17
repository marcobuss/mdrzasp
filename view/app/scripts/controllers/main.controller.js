/**
 * @ngdoc function
 * @name mdrzaspApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mdrzaspApp
 */
(function () {
  'use strict';

  angular
    .module('mdrzaspApp')
    .controller('MainCtrl', main);

  main.$inject = ['$scope', 'Session', 'Customer', 'CATEGORIES', 'Entry', 'ApplicationMessages', '$route'];

  function main($scope, Session, Customer, CATEGORIES, Entry, ApplicationMessages, $route) {
    var entries = Customer.entries({
        id: Session.userId
      },
      function (list) {
      },
      function (errorResponse) {
        console.log(errorResponse)
      });

    $scope.entries = entries;
    $scope.getInHour = getInHour;
    $scope.getAsDisplayString = getAsDisplayString;
    $scope.deleteEntry = deleteEntry;

    function getInHour(minutes) {
      return trunc(minutes / 60) + ':' + (minutes % 60);
    }

    function getAsDisplayString(category) {
      return CATEGORIES[category];
    }

    function trunc(x) {
      return x < 0 ? Math.ceil(x) : Math.floor(x);
    }

    function deleteEntry(selectedEntryId) {
      Entry.deleteById({id: selectedEntryId}, function(entry) {
        ApplicationMessages.addInfoMessage('Einheit gelöscht');
        $route.reload();
      });
    }
  }
})();
