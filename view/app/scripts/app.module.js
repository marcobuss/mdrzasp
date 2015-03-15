'use strict';

angular
  .module('app.auth', [
    'restService'
  ]);

/**
 * @ngdoc overview
 * @name mdrzaspApp
 * @description
 * # mdrzaspApp
 *
 * Main module of the application.
 */
angular
  .module('mdrzaspApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restService',
    'ui.bootstrap',
    'app.auth'
  ]);

