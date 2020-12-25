let jsonApi = require("jsonapi-server");
let usersHandler = require("../handlers/usersHandler.js");
// let schema  = require('../schemas/user')
// let schemaObj = Object.assign({}, schema, {type:"users"})

jsonApi.define({
  resource: "users",
  handlers: usersHandler,
  attributes: {
    username: jsonApi.Joi.string(),
    email: jsonApi.Joi.string(),
    image: jsonApi.Joi.string(),
    bio: jsonApi.Joi.string(),
    password: jsonApi.Joi.string(),
    // roles: jsonApi.Joi.array().items(jsonApi.Joi.number().integer()).optional()
  },
  examples: [
    {
      id: "1",
      type: "users",
      username: "anonymous",
      email: "anonymous",
      image: "anonymous",
      bio: "anonymous",
      password: "anonymous",
    },
  ],
  // relationships: {
  //   user: {
  //     meta: {
  //       relation: "primary",
  //       readOnly: false
  //     },
  //     links: {
  //       // get information about the linkage - list of ids and types
  //       self: "http://localhost:16006/rest/comments/6b017640-827c-4d50-8dcc-79d766abb408/relationships/author",
  //       // get full details of all linked resources
  //       related: "http://localhost:16006/rest/comments/6b017640-827c-4d50-8dcc-79d766abb408/author"
  //     },
  //     data: {
  //       type: "roles",
  //       id: 1 ,
  //     }
  //   },
  //   role: {
  //     meta: {
  //       relation: "foreign",
  //       belongsTo: "roles",
  //       as: "user",
  //       readOnly: true,
  //       // many: true
  //     },
  //     links: {
  //       // get information about the linkage - list of ids and types
  //       self: "http://localhost:16006/rest/articles/relationships/?comments=6b017640-827c-4d50-8dcc-79d766abb408",
  //       // get full details of all linked resour
  //       // ces (perform a search against the foreign key)
  //       related: "http://localhost:16006/rest/articles/?filter[comments]=6b017640-827c-4d50-8dcc-79d766abb408"
  //     }
  //   }
  // }
});
