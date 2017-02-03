var app = require('express').Router();
var multer = require('multer');
var upload = multer({dest:'uploads/'}).single('upload');

// Upload A File
app.post('/', function(req,res,next) {
  if (req.user) {
    upload(req,res,function(err) {
      if (err) {
        res.json(err);
      } else {
        res.json(req.file);
      }
    });
  } else {
    res.status(401);
    var response = {};
    response.errors = [];
    response.errors.push({"401":"Unauthorized. You are not logged in."});
    res.json(response);   
  }
});

module.exports = app;
