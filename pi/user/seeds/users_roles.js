exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users_roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_roles').insert([
        {users_id: 1, roles_id: 1},
      ]);
    });
};
