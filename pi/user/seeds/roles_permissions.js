exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('roles_permissions').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles_permissions').insert([
        {roles_id: 1, permissions_id: 1},
      ]);
    });
};
