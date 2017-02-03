var app = require('express').Router();

var home = require('./home');
var auth = require('./auth');
var users = require('./users');
var data = require('./data');
var upload = require('./upload');
var fail = require('./fail');

app.use(home);
app.use('/auth',auth);
app.use('/users',users);
app.use('/data',data);
app.use('/upload',upload);
app.use(fail);

module.exports = app;
