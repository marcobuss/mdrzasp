'use strict';

/**
 * @ngdoc function
 * @name mdrzaspApp.controller:RankingCtrl
 * @description
 * # RankingCtrl
 * Controller of the mdrzaspApp
 */
angular.module('mdrzaspApp')
  .controller('RankingCtrl', function ($scope, Session, Customer) {

    getRanking();

    function getRanking() {
      Customer.points(
        function (list) {
          list.forEach(function(element, index) {
            element.result = 0;
            element.entries.reduceRight(function(previus, current) {
              element.result += current.points;
              return previus + current.points;
            }, 0);
          });

          $scope.ranking = list;
        },
        function (errorResponse) {
          console.log(errorResponse)
        });
    };

  });
