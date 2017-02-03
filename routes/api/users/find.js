function Find(collection,username,callback) {
  collection.findOne({"username":username},{username:1},function(err,result) {
    callback(err,result);
  });
}

module.exports = Find;
