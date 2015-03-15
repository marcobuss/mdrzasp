/**
* @ngdoc function
* @name mdrzaspApp.controller:ProfileCtrl
* @description
* # ProfileCtrl
* Controller of the mdrzaspApp
*/
(function() {
  'use strict';

  angular
    .module('mdrzaspApp')
    .controller('ProfileCtrl', profile);

  profile.$inject = ['$scope', 'Session', 'Customer'];

  function profile($scope, Session, Customer) {

    $scope.save = save;
    loadProfile();

    function loadProfile() {
      console.log('load profile');
      $scope.profile = Customer.findById({id: Session.userId},
        function (profile) {
        },
        function (error) {
          console.log(error);
        });
    }

    function save(profile) {
      profile.$save(function(success){
        console.log(success);
      }, function(error){
        console.log(error);});
    }
  }
})();
