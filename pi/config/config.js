require('dotenv').config();

module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./user-dev.db"
  },
  test: {
    dialect: "sqlite",
    storage: "./user-test.db"
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
};
