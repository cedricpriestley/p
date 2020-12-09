exports.up = function(knex) {
  return knex.schema.table("roles_permissions", table => {
    table.foreign("roles_id").references("roles.id");
    table.foreign("permissions_id").references("permissions.id");
  });
};

exports.down = function(knex) {
  return knex.schema.table("roles_permissions", table => {
    table.dropForeign("roles_id");
    table.dropForeign("permissions_id");
  });
};
