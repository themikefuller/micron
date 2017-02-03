var settings = {
  "db":{
    "host":"localhost",
    "port":27017,
    "user":"username",
    "pass":"password",
    "name":"test",
    "auth": false
  },
  "server":{
    "port":3001
  },
  "custom":{
  }
};

var auth = '';
if (settings.db.auth) {
  auth = settings.db.user + ":" + settings.db.pass + "@";
}

// Create db URL
settings.db.url = "mongodb://" + auth + settings.db.host + ":" + settings.db.port + "/" + settings.db.name;

module.exports = settings;
