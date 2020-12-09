'use strict';

const Knex = require('knex');
const knexConfig = require('./knexfile');

const { Model } = require('objection');
const { User } = require('./models/user');

// Initialize knex.
const knex = Knex(knexConfig.development);

// Bind all Models to the knex instance. You only
// need to do this once before you use any of
// your model classes.
Model.knex(knex);

async function main() {

  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the users database.');
  });

  knex.schema
    .createTable("users", function(table) {
      table
        .increments("id")
        .unique()
        .primary()
        .notNullable()
      table
        .string("email")
        .unique()
        .notNullable()
      table
        .string("username")
        .unique()
        .notNullable()
      table.string("image").defaultTo("")
      table.text("bio").defaultTo("")
      table.string("password").notNullable()
      table.timestamps(true, true)
    })

  // Delete all users from the db.
  await User.query().delete();

  // Insert one row to the database.
  await User.query().insert({
    id: 'cedricpriestley',
    username: 'cedricpriestley',
    email: 'cedricpriestley@gmail.com',
    password: 'cedricpriestley@gmail.com'
  });

  // Read all rows from the db.
  const users = await User.query();
  console.log(users);
}


main()
  .then(() => knex.destroy())
  .catch(err => {
    console.error(err);
    return knex.destroy();
  });
