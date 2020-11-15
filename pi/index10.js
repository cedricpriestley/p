var SQLStore = require("jsonapi-store-sequelize");

jsonApi.define({
  resource: "comments",
  handlers: new SQLStore({
    dialect: "mysql",
    dialectOptions: {
      supportBigNumbers: true
    },
    host: "localhost",
    port: 3306,
    database: "jsonapi", // If not provided, defaults to the name of the resource
    username: "root",
    password: null,
    logging: false
  })
});
