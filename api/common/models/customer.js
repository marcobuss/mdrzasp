var config = require('../../server/config.json');
var path = require('path');
var loopback = require('loopback');

module.exports = function (Customer) {


  Customer.afterRemote('create', function (context, Customer, next) {
    console.log('> Customer.afterRemote.triggered');

    var options = {
      type: 'email',
      to: Customer.email,
      from: 'noreply@mdrzasp.suhail.uberspace.de',
      subject: 'Willkommen beim Sommerpokal 2015',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: encodeURIComponent('http://localhost:9000/#/'),
      user: Customer
    };

    Customer.verify(options, function (error, response) {
      if (error) {
        next(error);
        return;
      }

      console.log('> verification email sent:', response);

      next();
    });
  });

  //send password reset link when requested
  Customer.on('resetPasswordRequest', function(info) {
    var url = 'http://' + config.host + ':9000/#/reset-password' + '/' + info.accessToken.id + '/' + info.accessToken.userId;
    var template = loopback.template(path.resolve(__dirname, '../../server/views/reset.ejs'));
    info.url = url;

    Customer.app.models.Email.send({
      to: info.email,
      from: 'noreply@mdrzasp.suhail.uberspace.de',
      subject: 'Passwort zurücksetzen',
      html: template({info: info})
    }, function(err) {
      if (err) {
        console.log('> error sending password reset email');
        return
      }
      console.log('> sending password reset email to:', info.email);
    });
  });


  Customer.points = function (cb) {
    Customer.find({
        fields: {id: true, username: true, email: true},
        include: {
          relation: 'entries',
          scope: {
            fields: ['points']
          }
        }
      }, function (error, collection) {
        cb(error, collection);
      }
    );
  };

  Customer.remoteMethod(
    'points',
    {
      returns: {type: 'array', root: true},
      http: {verb: 'get'}
    }
  );
};
