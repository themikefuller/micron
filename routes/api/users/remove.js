var bcrypt = require('bcrypt');

function remove(collection,token,credentials,callback) {
  var password = '';
  if (credentials.password) {
    password = credentials.password.toString();
  }
  collection.findOne({"token":token},{"password":1},function(err,user) {
    var errors = [];
    if (user) {
      bcrypt.compare(password,user.password,function(err,result) {
        if (result) {
          collection.remove({_id:user._id},function(err,deleted) {
            callback(null,{"code":204,"message":"User has been removed."});
          });
        } else {
          errors.push({"code":400,"message":"Password did not match."});
          callback(errors,null);
        }
      });
    } else {
      errors.push({"code":409,"message":"Unauthorized. Invalid token."});
      callback(errors,null);
    }
  });
}

module.exports = remove;
