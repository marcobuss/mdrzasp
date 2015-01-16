var loopback = require('../../lib/loopback');

var properties = {
  firstName: {type: String, required: true}
};

var options = {
    relations: {
        entry: {
            model: Entry,
            type: hasMany,
            foreignKey: id
        }
    }
};

var user = loopback.Model.extend('user', properties, options);

console.log(user);
