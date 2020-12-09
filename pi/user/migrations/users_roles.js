exports.up = function(knex) {
  return knex.schema.createTable("users_roles", table => {
    table
      .integer("users_id")
      .references("users.id")
      .notNullable()
      .onDelete("CASCADE");

    table
      .integer("roles_id")
      .references("roles.id")
      .notNullable()
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users_roles");
};
