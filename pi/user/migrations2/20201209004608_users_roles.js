exports.up = function(knex) {
  return knex.schema.createTable("users_roles", table => {
    table.integer("users_id").unsigned();
    table.integer("roles_id").unsigned();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users_roles");
};
