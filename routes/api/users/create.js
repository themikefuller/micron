var bcrypt = require('bcrypt');
var crypto = require('crypto');

function create(collection,credentials,callback) {

  // Everything is ok.
  var ok = true;
  var username = '';
  var password = '';

  // Create an empty errors array.
  var errors = [];

  // Collect and transform the username to lowercase if it exists
  if (credentials.username) {
    username = credentials.username.toString();
    username = username.toLowerCase();
  }

  // collect password if it exists
  if (credentials.password) {
    password = credentials.password.toString();
  }

  // Check if the username contains only letters and numbers
  if (username != username.replace(/[^a-z0-9]/g, '')) {
    ok = false;
    errors.push({"code":400,"message":"Usernames must contain only English letters and numbers."});
  }

  // Check if the first character of the username is a letter.
  if (username[0] && username[0] != username[0].replace(/[^a-z]/g,'')) {
    ok = false;
    errors.push({"code":400,"message":"Usernames must start with an English letter of the alphabet."});
  }

  // Check if username is the correct length.
  if (username.length < 2 || username.length > 20) {
    ok = false;
    errors.push({"code":400,"message":"Username must be between 2 and 20 characters in length."});
  }

  // Check if password is correct length.
  if (password.length < 8 || password.length > 72) {
    var ok = false;
    errors.push({"code":400,"message":"Password must be between 8 and 72 characters in length."});
  }

  // If everything is "ok" so far, check if the username is available
  if (ok) {
    collection.findOne({"username":username},{},function(err,result) {
      if (result) {
        // Username is not available
        ok = false;
        errors.push({"code":409,"message":"Username is reserved."});
        callback(errors,ok);
      } else {
        // Username is available
        bcrypt.genSalt(5, function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash) {
            crypto.randomBytes(32,function(err,buffer) {
              var token = buffer.toString('hex');
              var user = {
                username:username,
                password:hash,
                timestamp:parseInt(Date.now() / 1000),
                token:token
              };
              collection.insert(user,function(err,result) {
                if (err) {
                  errors.push({"code":500,"message":"Internal Error. Could not create user."});
                  callback(errors,null);
                } else {
                  delete user.password;
                  delete user.timestamp;
                  callback(null,user);
                }
              });
            });
          });
        });
      }
    });
  } else {
    // If everything is not "ok", return errors
    callback(errors,ok);
  }

}

module.exports = create;
