var Users = require('./users');
var Auth = require('./auth');

function API() {
};

API.prototype.users = new Users();
API.prototype.auth = new Auth();

var api = new API();
module.exports = api;
