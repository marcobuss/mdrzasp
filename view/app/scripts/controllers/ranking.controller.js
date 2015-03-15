/**
 * @ngdoc function
 * @name mdrzaspApp.controller:RankingCtrl
 * @description
 * # RankingCtrl
 * Controller of the mdrzaspApp
 */
(function() {
  'use strict';

  angular
    .module('mdrzaspApp')
    .controller('RankingCtrl', ranking);

  ranking.$inject = ['$scope', 'Session', 'Customer'];

  function ranking($scope, Session, Customer) {
    getRanking();

    function getRanking() {
      Customer.points(
        function (list) {
          list.forEach(function(element) {
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
    }
  }
})();
