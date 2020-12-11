let jsonApi = require("jsonapi-server");
let fs = require("fs");
let path = require("path");

let usersHandler = require("./resources/users");

jsonApi.setConfig({
  port: 16006,
  graphiql: true
});
 
jsonApi.start();
