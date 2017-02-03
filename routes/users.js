var router = require('express').Router();
var api = require('./api');

// Create a new user
router.post('/',function(req,res,next) {
  var collection = req.db.collection('users');
  api.users.create(collection,req.body,function(err,result) {
    if (err) {
      res.status(err[0].code);
      res.json(err);
    } else {
      res.json(result);
    }
  }); 
});

router.get('/:username',function(req,res,next) {
  var collection = req.db.collection('users');
  var username = req.params.username.toString();
  api.users.find(collection,username,function(err,result) {
    if (result) {
      res.json(result);
    } else {
      next();
    }
  });
});

router.delete('/:username',function(req,res,next) {
  var collection = req.db.collection('users');
  var token = false;
  if (req.user.token) {
    token = req.user.token;
  }
  api.users.remove(collection,token,req.body,function(err,result) {
    var response = {};
    if (err) {
      response.errors = err;
      res.status(err[0].code);
      res.json(response);
    } else {
      response = result;
      res.json(response);
    }
  });
});

module.exports = router;
