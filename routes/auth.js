var router = require('express').Router();
var api = require('./api');

// Show user information if logged in
router.get('/whoami',function(req,res,next) {
  var response = {};
  if (req.user) {
    response.user = req.user;
  } else {
    res.status(401);
    response.errors = [];
    response.errors.push({"401":"Unauthorized. You are not logged in."});
  }
    res.json(response);
});

// POST Login
router.post('/login',function(req,res,next) {
  var collection = req.db.collection('users');
  api.auth.login(collection,req.body,function(err,result) {
    if (result) {
      res.json(result);
    } else {
      res.status(err[0].code);
      res.json(err);
    }
  });
});

// POST Logout
router.post('/logout',function(req,res,next) {
  var collection = req.db.collection('users');
  api.auth.logout(collection,req.user,function(err,result) {
    if (err) {
      res.status(err[0].code);
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
