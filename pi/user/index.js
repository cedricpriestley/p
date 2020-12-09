const knexInstance = require('knex')(config);
await knexInstance.migrate.run();
await knexInstance.seed.run();
