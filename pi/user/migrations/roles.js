exports.up = function(knex) {
  return knex.schema.createTable("roles", table => {
    table.increments("id").primary();
    table.string("name", 45).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("roles");
};
