exports.up = function(knex) {
  return knex.schema.createTable("permissions", table => {
    table.increments("id").primary();
    table.string("name", 45).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("permissions");
};
