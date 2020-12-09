exports.up = function(knex) {
  return knex.schema.createTable("roles_permissions", table => {
    table.foreign("roles_id").references("roles.id");
    table.foreign("permissions_id").references("permissions.id");
    // table.integer("roles_id").unsigned();
    // table.integer("permissions_id").unsigned();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("roles_permissions");
};
