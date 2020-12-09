const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

// const sequelize = new Sequelize(db[process.env.NODE_ENV]);
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './db/user2.db'
//   logQueryParameters: true,
//   benchmark: true
// });
//

// const sequelize = new Sequelize('user', 'root', 'root', {
//   host: 'localhost',
//   dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
// });

// (async () => {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// })();

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

class User extends Model {}

User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

(async () => {
  await sequelize.sync();
  const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
  console.log(jane.toJSON());
})();
