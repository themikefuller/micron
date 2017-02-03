function Users() {};

Users.prototype.create = require('./create');
Users.prototype.remove = require('./remove');
Users.prototype.find = require('./find');

module.exports = Users;
