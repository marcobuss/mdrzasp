'use strict';

var service = angular.module('apiService', ['ngResource']);


service.factory('Users', function($resource, Session) {
  return function(apiKey) {
    return $resource(
      'http://0.0.0.0:3000/api/Users/:id',
      {},
      {
        get: { method: 'get', params: {}, headers: {Authorization: apiKey} },
        register: { method: 'post', params: {} },
        login: { method: 'post', params: { id: 'login' } }
      }
    );
  }
});
