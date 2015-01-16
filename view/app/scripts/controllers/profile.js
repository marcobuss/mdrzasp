'use strict';

/**
 * @ngdoc function
 * @name mdrzaspApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the mdrzaspApp
 */
angular.module('mdrzaspApp')
  .controller('ProfileCtrl', function ($scope, Session, Customer) {

    loadProfile();

    function loadProfile() {
      console.log('load profile');
      $scope.profile = Customer.findById({id: Session.userId},
        function (profile) {
        },
        function (error) {
          console.log(error);
        });
    };

    $scope.save = function (profile) {
      profile.$save(function(success){}, function(error){console.log(error);});
    };

  });
