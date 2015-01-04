'use strict';

/**
 * @ngdoc function
 * @name mdrzaspApp.controller:AddEntryCtrl
 * @description
 * # MainCtrl
 * Controller of the mdrzaspApp
 */
angular.module('mdrzaspApp').controller('AddEntryCtrl', function ($scope, datepickerPopupConfig, CATEGORYS, Session, Entry) {

  resetEntry();

  $scope.maxDate = new Date();
  $scope.categorys = CATEGORYS;

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.format = 'dd. MMMM yyyy';

  datepickerPopupConfig.currentText = 'Heute';
  datepickerPopupConfig.clearText = 'Löschen';
  datepickerPopupConfig.closeText = 'Schließen';

  $scope.addEntry = function(entry) {
    entry.created = new Date();
    entry.userId = Session.userId;
    $scope.successMessage = null;

    Entry.create(entry).$promise.then(function(e) {
      $scope.successMessage = 'Eintrag erfolgreich angelegt';
    });
  };

  function resetEntry() {
    $scope.entry = {
      category: null,
      date: null,
      duration: null,
      description: null,
      created: null,
      userId: null
    };
  };
})
  .constant('CATEGORYS', {
    'alternative': 'Alternative Sportarten',
    'bike': "Radfahren"
  });
