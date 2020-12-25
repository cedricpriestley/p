// 'use strict';

let jsonApi = require("jsonapi-server");

const Knex = require('knex');
const knexConfig = require('../knexfile');

const { Model, ref, initialize, Modifiers } = require('objection');
let { User } = require('../models/User')

const knex = Knex(knexConfig.development);
// // Initialize knex.
// (async () => {
//   await initialize(knex, [User]);
// })().catch(err => {
//   console.error(err);
// });

// Bind all Models to the knex instance. You only
// need to do this once before you use any of
// your model classes.
Model.knex(knex);

const userHandler = module.exports = new jsonApi.MemoryHandler();


/**
  Create (store) a new resource given a resource type and an object.
  */
userHandler.create = (request, newResource, callback) => {
  // Check to see if the ID already exists
  const index = this._indexOf(resources[request.params.type], newResource)
  if (index !== -1) {
    return callback({ // eslint-disable-line standard/no-callback-literal
      status: '403',
      code: 'EFORBIDDEN',
      title: 'Requested resource already exists',
      detail: `The requested resource already exists of type ${request.params.type} with id ${request.params.id}`
    })
  }
  // Push the newResource into our in-memory store.
  resources[request.params.type].push(newResource)
  // Return the newly created resource
  return callback(null, this._clone(newResource))
}

// userHandler.find = (request, callback) => {
//   console.log('v');
//   exit
//   // Pull the requested resource from the in-memory store
//   const theResource = resources[request.params.type].filter(anyResource => anyResource.id === request.params.id).pop()

//   // If the resource doesn't exist, error
//   if (!theResource) {
//     return callback({ // eslint-disable-line standard/no-callback-literal
//       status: '404',
//       code: 'ENOTFOUND',
//       title: 'Requested resource does not exist',
//       detail: `There is no ${request.params.type} with id ${request.params.id}`
//     })
//   }

//   // Return the requested resource
//   return callback(null, MemoryStore._clone(theResource))
// }

// resources represents out in-memory data store
// const resources = { }

/**
  Handlers readiness status. This should be set to `true` once all handlers are ready to process requests.
  */
// let ready = false

/**
  initialise gets invoked once for each resource that uses this hander.
  In this instance, we're allocating an array in our in-memory data store.
  */
userHandler.initialise = resourceConfig => {
  // console.log(jsonApi);
  // console.log(resourceConfig);
  console.log(jsonApi._resources);
  // console.log(jsonApi.MemoryHandler);
  // console.log(resourceConfig);
  // console.log(jsonApi._resourcjsonApi.MemoryHandler.prototypees.users);
  // resources['users'] = resourceConfig.examples || [ ]

  // let ready = true

  (async () => {
    const users = await User.query()
      .select(['id'])
    for(var user of users){
      user.type = 'users'
      // console.log(user)
    }

    // resources[resourceConfig.resource] = resourceConfig.examples || [ ]
    // this.ready = true
    // let {u:User} = [users[0]] 
    // console.log(u)
    // console.log(JSON.stringify([users[0]]))
    // console.log(resourceConfig.examples)
    // jsonApi._resources.users.examples = [users[0]]
    // resources['users'] = resourceConfig.examples || [ ]
    jsonApi._resources.users = resourceConfig.examples
  })().catch(err => {
    console.error(err);
  });
}
