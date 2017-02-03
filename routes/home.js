var router = require('express').Router();
var api = require('./api');

// Middleware
router.use(function(req,res,next) {
  var collection = req.db.collection('users');
  req.user = false;
  if (req.headers.authorization) {
    api.auth.authorize(collection,req.headers.authorization.toString(),function(err,user) {
      if (user) {
        req.user = user;
      }
      next();
    });
  } else if (req.cookies.token) {
    api.auth.authorize(collection,req.cookies.token.toString(),function(err,user) {
      if (user) {
        req.user = user;
      }
      next();
    }); 
  } else {
    next();
  }
});

// Home page response
router.get('/',function(req,res) {
  res.json({"token":req.token,"message":"This is the home page"});
});

module.exports = router;
