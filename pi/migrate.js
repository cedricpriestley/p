// console.log('helli');
// const sqlite3 = require('sqlite3').verbose();
// let db = new sqlite3.Database('./user.db', (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Connected to the chinook database.');
// });
//


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/user.db'
});

// sequelize.authenticate()
//   .then(() => console.log('Database Connected'))
//   .catch(err => console.log('Error: ', err))
// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

class User extends Model {}
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

(async () => {
  await sequelize.sync().then(() => {
    console.log('User table created');
  }).finally(() => {
    sequelize.close();
  })

  const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
  console.log(jane.toJSON());
})();

sequelize.close();

// close the database connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });
