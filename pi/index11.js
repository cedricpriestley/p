var jsonApi = require("jsonapi-server");

jsonApi.setConfig({
  port: 16006,
  graphiql: true
});

jsonApi.define({
  resource: "photos",
  handlers: new jsonApi.MemoryHandler(),
  attributes: {
    title: jsonApi.Joi.string(),
    url: jsonApi.Joi.string().uri(),
    height: jsonApi.Joi.number().min(1).max(10000).precision(0),
    width: jsonApi.Joi.number().min(1).max(10000).precision(0)
  }
});

jsonApi.start();
