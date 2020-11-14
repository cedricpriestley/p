var sqlite3 = require('sqlite3').verbose();
console.log("hello");
// var fs = require('fs');
// var dbFile = './database.sqlite';
// var dbExists = fs.existsSync(dbFile);

// if (!dbExists) {
//   fs.openSync(dbFile, 'w');
// }

// var db = new sqlite3.Database(dbFile);

// if (!dbExists) {
//   db.run('CREATE TABLE `your_table` (' +
//     '`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,' +
//     '`name` TEXT,' +
//     '`email` TEXT,');
// }

// // You can insert some data here in order to test
// // var statement = db.prepare('INSERT INTO `your_table` (`name`, `email`) ' +
// 'VALUES (?, ?)');

// // statement.run('Your name', 'some_random@email.com');
// // statement.finalize();

// db.close();
