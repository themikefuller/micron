function Auth(db) {
  this.db = db;
};

Auth.prototype.authorize = require('./authorize');
Auth.prototype.login = require('./login');
Auth.prototype.logout = require('./logout');

module.exports = Auth;
