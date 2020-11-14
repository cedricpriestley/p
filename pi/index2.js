const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

db.run(`CREATE TABLE IF NOT EXISTS tbl_contact(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  phone TEXT,
  photo TEXT
)`, () => {
  db.each('SELECT count(*) AS exp FROM tbl_contact', (err, row) => {
    if (err) throw err
    console.log(`No.: ${row.exp}`)
  })
})
