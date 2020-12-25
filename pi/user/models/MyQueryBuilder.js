// MyQueryBuilder.js
const { QueryBuilder } = require('objection');

class MyQueryBuilder extends QueryBuilder {
  myCustomMethod(something) {
    doSomething(something);
    return this;
  }
}
