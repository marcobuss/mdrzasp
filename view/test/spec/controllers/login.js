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
      expect(scope.credentials.email).toBe('');
      expect(scope.credentials.password).toBe('');
    });
  });

  describe('register', function() {
    var credentials = {
      email: 'mail@mail.de',
      emailRepeat: 'mail@mail.de',
      password: 'pw',
      passwordRepeat: 'pw'
    };

    it('must set error if email-repeat is invalid', function() {
      credentials.emailRepeat = 'not_mail@mail.de';

      scope.registerNewUser(credentials);

      expect(scope.error.emailRepeat).not.toBeUndefined();
    });

    it('must set error if email is invalid', function() {
      credentials.email = 'invalid_email';

      scope.registerNewUser(credentials);

      expect(scope.error.email).not.toBeUndefined();
    });

    it('must set error is no e-mail is provided', function() {
      credentials.email = null;

      scope.registerNewUser(credentials);

      expect(scope.error.email).not.toBeUndefined();
    });

    it('must set error if passwordRepeat in invalid', function() {
      credentials.passwordRepeat = 'invalid';

      scope.registerNewUser(credentials);

      expect(scope.error.passwordRepeat).not.toBeUndefined();
    });

    it('must set error if password is empty', function() {
      credentials.password = null;

      scope.registerNewUser(credentials);

      expect(scope.error.password).not.toBeUndefined();
    });
  });
});
