var app = require('express').Router();

app.get('*',function(req,res) {
  var response = {};
  response.errors = [];
  response.errors.push({"code":404,"message":"Not Found"});
  res.status(response.errors[0].code);
  res.json(response);
});

app.use(function(req,res) {
  res.status(405);
  res.json({"message":"Method Not Allowed"});
});

module.exports = app;
