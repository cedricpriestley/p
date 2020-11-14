var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

db.serialize(function() {

  db.run("CREATE TABLE if not exists parameters (path TEXT)");
  var stmt = db.prepare("INSERT INTO parameters VALUES (?)");


  stmt.run("test paramter");
  stmt.finalize();

  db.each("SELECT path FROM parameters", function(err, row) {
    console.log(row.path);
  });
});
db.close();
