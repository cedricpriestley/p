// BaseModel.js
const { Model, ref, initialize } = require('objection');
const { MyQueryBuilder } = require('./MyQueryBuilder');
const Knex = require('knex');

class BaseModel extends Model {
  static get QueryBuilder() {
    return MyQueryBuilder;
  }
}
