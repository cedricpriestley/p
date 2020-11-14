const sqlite3 = require('sqlite3').verbose();
var customDB = new sqlite3.Database("./db/custom.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
