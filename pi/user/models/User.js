'use strict';

const BaseModel = require('./BaseModel');
const { Model, ref, initialize } = require('objection');
const { MyQueryBuilder } = require('./MyQueryBuilder');
const Knex = require('knex');

class User extends Model {
// static get jsonSchema() {
    // return {
      // type: 'users',
      // required: ['name'],
      // properties: {
      //   id: { type: 'integer' },
      //   name: { type: 'string', minLength: 1, maxLength: 255 },
      //   age: { type: 'number' } // optional
      // }
    // };
  // }
  // Table name is the only required property.
  static get tableName() {
    return 'users';
  }

  static get type() {
    return 'users';
  }

  // static get QueryBuilder() {
  //   return MyQueryBuilder;
  // }
}

module.exports = {
  User,
};
