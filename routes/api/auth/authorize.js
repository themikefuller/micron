function Authorize(collection,token,callback) {
  collection.findOne({"token":token},{"password":0},function(err,result) {
    var errors = [];
    if (err) {
      callback(err,null);
    } else {
      if (!result) {
        errors.push({"code":401,"message":"Unauthorized"});
        callback(errors,null);
      } else {
        callback(null,result);
      }
    }
  });
}

module.exports = Authorize;
