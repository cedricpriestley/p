const Sequelize = require('sequelize');

const path = 'mysql://root:root@localhost:3306/user';
const sequelize = new Sequelize(path, { operatorsAliases: false });

sequelize.authenticate().then(() => {
  console.log('Connection established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
}).finally(() => {
  sequelize.close();
});

// let Dummy = sequelize.define('dummy', {
//   description: Sequelize.STRING
// });

// Dummy.sync().then(() => {
//   console.log('New table created');
// }).finally(() => {
//   sequelize.close();
// })
// let User = sequelize.define('user', {
//   username: DataTypes.STRING,
// });

// User.sync().then(() => {
//   console.log('User table created');
// }).finally(() => {
//   sequelize.close();
// })

// class User extends Model {}
// User.init({
//   username: DataTypes.STRING,
//   birthday: DataTypes.DATE
// }, { sequelize, modelName: 'user' });

(async () => {
  // await sequelize.sync().then(() => {
  //   console.log('User table created');
  // }).finally(() => {
  //   sequelize.close();
  // })

  // const jane = await User.create({
  //   username: 'janedoe',
  //   birthday: new Date(1980, 6, 20)
  // });
  // console.log(jane.toJSON());
})();
