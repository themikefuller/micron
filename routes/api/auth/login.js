var bcrypt = require('bcrypt');
var crypto = require('crypto');

function Login(collection,credentials,callback) {
  var errors = [];
  var username = '';
  var password = '';
  if (credentials.username) {
    username = credentials.username.toString().toLowerCase();
  }
  if (credentials.password) {
    password = credentials.password.toString();
  }
  var errors = [];
  collection.findOne({"username":username},{},function(err,user) {
    if (user) {
      bcrypt.compare(password,user.password,function(err,result) {
        if (result) {
          crypto.randomBytes(32,function(err,token) {
            token = token.toString('hex');
            collection.findAndModify({"username":username},[],{$set:{"token":token}},{"new":true},function(err,validuser) {
              var doc = validuser.value;
              delete doc.password;
              callback(null,doc);
            });   
          });
        } else {
          errors.push({"code":400,"message":"Invalid username or password."});
          callback(errors,null);
        }
      });
    } else {
      errors.push({"code":400,"message":"Invalid username or password."});
      callback(errors,null);
    }
  });
}

module.exports = Login;
