(function () {
  'use strict';

  angular
    .module('mdrzaspApp')
    .directive('entryDialog', addEntryDialog);

  function addEntryDialog() {
    var directive = {
      restrict: 'E',
      controller: AddEntryCtrl
    };

    return directive;
  }

  AddEntryCtrl.$inject = ['$scope', 'Entry', 'CATEGORIES', '$modal', 'Session', '$route', 'datepickerPopupConfig'];

  function AddEntryCtrl($scope, Entry, CATEGORIES, $modal, Session, $route, datepickerPopupConfig) {
    var modalInstance;

    $scope.categorys = CATEGORIES;
    $scope.openCalendar = openCalendar;
    $scope.saveEntry = saveEntry;
    $scope.showEntryEditDialog = showEntryEditDialog;
    $scope.closeEntry = close;
    $scope.isEditable = isEditable;

    initDatepicker();
    resetEntry();

    function close(reload) {
      modalInstance.close();
      if (reload) {
        $route.reload();
      }
    }

    function openCalendar($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    }

    function saveEntry(entry) {
      $scope.successMessage = null;

      Entry.upsert(entry, function(e) {
        $scope.successMessage = 'Eintrag erfolgreich angelegt';
        close(true);
      });
    }

    var entryId = null;
    function showEntryEditDialog(selectedEntryId) {
      entryId = selectedEntryId;

      if(entryId) {
        $scope.entry = Entry.findById({id: entryId}, function(success) {
          open('bearbeiten');
        });
      } else {
        $scope.entry = {
          created: new Date(),
          userId: Session.userId
        };
        open('anlegen');
      }
    }

    function open(modus) {
      $scope.modus = modus;
      modalInstance = $modal.open({
        templateUrl: 'views/addEntry.html',
        scope: $scope
      });
    }

    function resetEntry() {
      $scope.entry = {
        category: null,
        date: null,
        duration: null,
        description: null,
        created: null,
        userId: null
      };
    }

    var MS_PER_DAY = 1000 * 60 * 60 * 24;
    function isEditable(created) {
      return Math.floor((new Date() - new Date(created)) / MS_PER_DAY) <= 1;
    }

    function initDatepicker() {
      $scope.maxDate = new Date();

      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };

      $scope.format = 'dd. MMMM yyyy';

      datepickerPopupConfig.currentText = 'Heute';
      datepickerPopupConfig.clearText = 'Löschen';
      datepickerPopupConfig.closeText = 'Schließen';
    }
  }
})();
