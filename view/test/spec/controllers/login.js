'use strict';

describe('LoginCtrl', function () {

  beforeEach(module('mdrzaspApp'));

  var LoginCtrl, scope;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  describe('init', function() {
    it('must initialize credentials', function() {
      expect(scope.credentials.email).toBe('')
      expect(scope.credentials.password).toBe('');
    });
  });
});
