'use strict';

/**
 * @ngdoc function
 * @name mdrzaspApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mdrzaspApp
 */
angular.module('mdrzaspApp')
  .controller('MainCtrl', function ($scope, Session, Customer, CATEGORYS) {

    $scope.entries = Customer.entries({
        id: Session.userId
      },
      function (list) {
        console.log(list);
      },
      function (errorResponse) {
        console.log(errorResponse)
      });

    $scope.getInHour = function (minutes) {
      return trunc(minutes / 60) + ':' + (minutes % 60);
    };

    $scope.getAsDisplayString = function (category) {
      return CATEGORYS[category];
    }

    function trunc(x) {
      return x < 0 ? Math.ceil(x) : Math.floor(x);
    };

  });
