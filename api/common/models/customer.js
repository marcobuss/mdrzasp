module.exports = function (Customer) {


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
