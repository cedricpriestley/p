const Sequelize = require('sequelize');
// import { initModels, user } from "./models/init-models.mjs";
const initModels = require('./models/init-models');
const path = 'mysql://root:root@localhost:3306/users';
const sequelize = new Sequelize(path);

sequelize.authenticate().then(() => {

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

    // const jane = await User.create({
    //   username: 'janedoe',
    //   birthday: new Date(1980, 6, 20)
    // });
    // console.log(jane.toJSON());
  })();
  // initModels(sequelize);
  console.log('Connection established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
}).finally(() => {
  sequelize.close();
});

// const cedric = await user.findAll({ where: { "id": 1 } });
// console.log(cedric);
// const attr: userCreationAttributes = {
//   username: "lashun",
// };
// const lashun = await user.create(attr);
