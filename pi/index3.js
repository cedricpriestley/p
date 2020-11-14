const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const sqlite3 = require("sqlite3").verbose();

// Creating the Express server
const app = express();

// Server configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Database connection
let db = null;
if (process.env.NODE_ENV === "production") {
  // PostgreSQL in production
  const pool = new Pool({
    user: "mystery",
    host: "xxxxx.elephantsql.com",
    database: "mystery",
    password: "asecretthingthatnoonehastosee",
    port: 5432
  });
} else {
  // SQlite by default
  const db_name = path.join(__dirname, "data", "apptest.db");
  db = new sqlite3.Database(db_name, err => {
    if (err) {
      return console.error(err.message);
    }
  });
  // Hack to look like node-postgres
  db.query = function (sql, params, callback) {
    if (!Array.isArray(params)) throw new Error("params is not an array!");
    sql = sql.replace(/SERIAL PRIMARY KEY/, "INTEGER PRIMARY KEY AUTOINCREMENT");
    this.all(sql, params, function (err, rows) {
      callback(err, { rows: rows });
    });
  };
}
console.log("Successful connection to the database");

(async () => {
  try {
    // Creating the Books table (Book_ID, Title, Author, Comments)
    const sql_create = `CREATE TABLE IF NOT EXISTS books (
      book_id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      author VARCHAR(100) NOT NULL,
      comments TEXT
    );`;
    await db.query(sql_create, []);
    console.log("Successful creation of the 'Books' table");
    // Database seeding
    const result = await db.query("SELECT COUNT(*) AS count FROM Books", []);
    const count = result.rows[0].count;
    if (count === 0) {
      const sql_insert = `INSERT INTO Books (Title, Author, Comments) VALUES
        ('Mrs. Bridge', 'Evan S. Connell', 'First of the series'),
        ('Mr. Bridge', 'Evan S. Connell', 'Second in the series'),
        ('L\'ingénue libertine', 'Colette', 'Minne + Les égarements de Minne');`;
      await db.query(sql_insert, []);
      console.log("Successful creation of 3 books");
    }
  } catch (e) { return console.error(e.message); }
})();

// Starting the server
app.listen(3000, () => {
  console.log("Server started (http://localhost:3000/) !");
});

// GET /
app.get("/", (req, res) => {
  // res.send("Hello world...");
  res.render("index");
});

// GET /about
app.get("/about", (req, res) => {
  res.render("about");
});

// GET /data
app.get("/data", (req, res) => {
  const test = {
    title: "Test",
    items: ["one", "two", "three"]
  };
  res.render("data", { model: test });
});

// GET /books
app.get("/books", async (req, res) => {
  try {
    const sql = "SELECT * FROM Books ORDER BY Title";
    const result = await db.query(sql, []);
    res.render("books", { model: result.rows });
  } catch (e) { console.error(e.message); }
});

// GET /create
app.get("/create", (req, res) => {
  res.render("create", { model: {} });
});

// POST /create
app.post("/create", async (req, res) => {
  try {
    const sql = "INSERT INTO Books (Title, Author, Comments) VALUES ($1, $2, $3)";
    const book = [req.body.title, req.body.author, req.body.comments];
    const result = await db.query(sql, book);
    res.redirect("/books");
  } catch (e) { console.error(e.message); }
});

// GET /edit/5
app.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM Books WHERE Book_ID = $1";
    const result = await db.query(sql, [id]);
    res.render("edit", { model: result.rows[0] });
  } catch (e) { console.error(e.message); }
});

// POST /edit/5
app.post("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = [req.body.title, req.body.author, req.body.comments, id];
    const sql = "UPDATE Books SET Title = $1, Author = $2, Comments = $3 WHERE (Book_ID = $4)";
    const result = await db.query(sql, book);
    res.redirect("/books");
  } catch (e) { console.error(e.message); }
});

// GET /delete/5
app.get("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM Books WHERE Book_ID = $1";
    const result = await db.query(sql, [id]);
    res.render("delete", { model: result.rows[0] });
  } catch (e) { console.error(e.message); }
});

// POST /delete/5
app.post("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "DELETE FROM Books WHERE Book_ID = $1";
    const result = await db.query(sql, [id]);
    res.redirect("/books");
  } catch (e) { console.error(e.message); }
});
