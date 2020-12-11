exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'cedricpriestley', email: 'cedricpriestley@gmail.com', password: 'password', image: 'image.jpg', bio: 'bio'},
      ]);
    });
};
