let jsonApi = require("jsonapi-server");
let usersHandler = require("../handlers/usersHandler.js");

jsonApi.define({
  resource: "users",
  handlers: usersHandler,
  attributes: {
    id: jsonApi.Joi.string(),
    url: jsonApi.Joi.string().uri(),
    height: jsonApi.Joi.number().min(1).max(10000).precision(0),
    width: jsonApi.Joi.number().min(1).max(10000).precision(0)
  }
});
