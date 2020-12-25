let jsonApi = require("jsonapi-server");
let rolesHandler = require("../handlers/rolesHandler.js");

jsonApi.define({
  resource: "roles",
  handlers: rolesHandler,
  attributes: {
    id: jsonApi.Joi.number(),
    name: jsonApi.Joi.string()
  },
  examples: [
    {
      id: 1,
      type: "roles",
      name: "anonymous",
    }
  ],
});
