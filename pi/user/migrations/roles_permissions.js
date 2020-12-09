exports.up = function(knex) {
  return knex.schema.createTable("roles_permissions", table => {
    table
      .integer("roles_id")
      .references("roles.id")
      .notNullable()
      .onDelete("CASCADE");

    table
      .integer("permissions_id")
      .references("permissions.id")
      .notNullable()
      .onDelete("CASCADE");
  });
};
 
exports.down = function(knex) {
  return knex.schema.dropTable("roles_permissions");
};
