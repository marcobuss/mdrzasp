'use strict';

var service = angular.module('apiService', ['ngResource']);


service.factory('Users', function($resource) {
  return $resource(
    'http://0.0.0.0:3000/api/Users/:method',
    {},
    {
      register: { method: 'post', params: {} },
      login: { method: 'post', params: { method: 'login' } }
    }
  );
});
