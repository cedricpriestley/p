exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'cedricpriestley',
          email: 'cedricpriestley@gmail.com', 
          password: 'password',
          image: 'cedric.jpg',
          bio: 'bio'
        },
        {
          id: 2,
          username: 'janedoe',
          email: 'janedoe@gmail.com', 
          password: 'password',
          image: 'jane.jpg',
          bio: 'bio'
        },
      ]);
    });
};
