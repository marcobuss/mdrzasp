'use strict';

/**
 * @ngdoc function
 * @name mdrzaspApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mdrzaspApp
 */
angular.module('mdrzaspApp')
  .controller('MainCtrl', function ($scope, Session, Users) {

    $scope.userfunc = function() {
      console.log(Session);
      /*var user = Users({Authorization: Session.id}).get({id: Session.userId}); */
      var user = Users(Session.id).get({id: Session.userId});
      console.log(user);
    }

 });
