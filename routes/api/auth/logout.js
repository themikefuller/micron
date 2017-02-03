function Logout(collection,user,callback) {
  var token = null;
  if (user.token) {
    token = user.token.toString();
  }
  collection.findAndModify({"token":token},[],{$set:{"token":false}},{"new":true},function(err,result) {
    var response = {};
    if (result.value) {
      response.message = "Logged out";
      callback(null,response);
    } else {
      response.errors = [];
      response.errors.push({"code":401,"message":"Unauthorized. Invalid token."});
      callback(response.errors,null);
    }
  });
}

module.exports = Logout;
