var ObjectId = require('mongodb').ObjectID;
var app = require('express').Router();

app.use(function(req,res,next) {
  if (!req.user) {
    var response = {};
    response.errors = [];
    var err = {"code":"401","message":"Unauthorized."};
    response.errors.push(err);
    res.json(response);
  } else {
    next();
  }
});

app.get('/',function(req,res,next) {
  req.db.collection('data').find({},{},{"sort":{_id:-1}}).toArray(function(err,docs) {
    var x = 0;
    var response = {
      "data":[]
    };
    for(x=0;x<docs.length;x++) {
      var doc = {};
      doc.id = docs[x].id;
      doc.link = req._parsedOriginalUrl.pathname + '/' + docs[x].id;
      doc.data = docs[x];
      delete doc.data.id;
      delete doc.data._id;
      response.data.push(doc);
    }
    res.json(response);
  });
});

app.get('/:id',function(req,res,next) {
  id = req.params.id.toString();
  req.db.collection('data').findOne({id:id},function(err,data) {
    if (data) {
      var doc = {};
      doc.id = data.id;
      doc.link = req._parsedOriginalUrl.pathname;
      doc.data = data;
      delete doc.data.id;
      delete doc.data._id;
      res.json(doc);
    } else {
      next();
    }
  });
});

app.post('/:id',function(req,res,next) {
  var body = req.body;
  if (body._id) {
    delete body._id;
  }
  body.id = req.params.id.toString();
  req.db.collection('data').findAndModify({id:body.id},[],body,{"new":true,"upsert":true},function(err,doc){
    var response = {};
    if (doc.lastErrorObject.n) {
      response.id = body.id;
      response.link = req.baseUrl + '/' + body.id;
      response.data = doc.value;
      delete response.data.id;
      delete response.data._id;
    } else {
      response.updated = false;
    }
    res.json(response);
  });
});

app.delete('/',function(req,res,next) {
  req.db.collection('data').remove({},function(err,doc) {
    var response = {};
    if (doc.result.n) {
      response.deleted = doc.result.n;
    } else {
      response.deleted = false;
    }
    res.json(response);
  });
});

app.delete('/:id',function(req,res,next) {
  var id = req.params.id.toString();
  req.db.collection('data').remove({id:id},function(err,doc){
    var response = {};
    if (doc.result.n) {
      response.deleted = true;
    } else {
      response.deleted = false;
    }
    res.send(response);
  });
});

module.exports = app;
