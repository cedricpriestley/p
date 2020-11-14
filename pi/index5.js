const db = require('better-sqlite3')('./db/users.db', { verbose: console.log });

const row = db.prepare('SELECT * FROM tbl1 WHERE one = ?').get("hello!");
console.log(row.one, row.two);
