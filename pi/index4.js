/**
 * Small refresher on how to use sqlite3 embedded in node.js
 *
 * LINKS:
 * - Package: https://www.npmjs.com/package/sqlite3 (NOTE: Includes correct platform binary of sqlite3. No extra install required.)
 * - API: https://github.com/mapbox/node-sqlite3/wiki/API
 */
var sqlite3 = require('sqlite3').verbose();

// var db = new sqlite3.Database('./dbfiles/testdb');
var db = new sqlite3.Database(':memory:');

db.serialize(function() {
    db.run("CREATE TABLE if not exists lorem (info TEXT)");

    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log("---- db.each")

        console.log(row.id + ": " + row.info);
    });


    db.all("SELECT * from lorem where info like '%7%'",function(err,rows){
        console.log("---- db.all")

        console.dir(rows);
    });


    db.get("SELECT * from lorem where info='Ipsum 8'", function (err, row) {
        console.log("---- db.get")

        console.log(row);
    });
});

db.close();
