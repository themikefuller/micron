var fs = require('fs');
var app = require('defacto');
var mongo = require('mongodb');
var routes = require('./routes');

try {
  var settings = require('./settings');
  if (settings) {
    Run(settings);
  }
} catch(e) {
  fs.readFile('./settings/default.js', 'utf8', function(err,data) {
    fs.writeFile('./settings/index.js',data,function(err,result) {
      var settings = require('./settings');
      Run(settings);
    });
  });
}

function Run(settings) {
  mongo.connect(settings.db.url, function(err,db){
    if (err) {
      throw err;
    }
    app.use(function(req,res,next){
      req.db = db;
      next();
    });
    app.use(routes);
    app.listen(settings.server.port);
  });
}
