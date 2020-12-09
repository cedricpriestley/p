const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './data.db',
  },
});

// Create a table
knex.schema
  .createTable('users', table => {
    table.increments('id');
    table.string('user_name');
  })

// ...and another
  .createTable('accounts', table => {
    table.increments('id');
    table.string('account_name');
    table
      .integer('user_id')
      .unsigned()
      .references('users.id');
  })

// Then query the table...
  .then(() =>
    knex('users').insert({ user_name: 'Tim' })
  )

// ...and using the insert id, insert into the other table.
  .then(rows => 
    knex('accounts').insert({ account_name: 'knex', user_id: rows[0] })
  )

// Query both of the rows.
  .then(() => 
    knex('users')
    .join('accounts', 'users.id', 'accounts.user_id')
    .select('users.user_name as user', 'accounts.account_name as account')
  )

// map over the results
  .then(rows =>
    rows.map(row => {
      console.log(row)
    })
  )

// Finally, add a .catch handler for the promise chain
  .catch(e => {
    console.error(e);
  });
