let JSONAPISerializer = require('jsonapi-serializer').Serializer;
let schema  = require('../schemas/role')

var UserSerializer = new JSONAPISerializer('roles', schema);

// var UserSerializer = new JSONAPISerializer('users', {
//   attributes: ['id', 'username', 'email', 'image', 'bio', 'password']
// });

var data = [
  {
    id: 1,
    type: "roles",
    name: "anonymous"
  }
];

var roles = UserSerializer.serialize(data);
module.exports = roles

console.log(data)
// console.log(data.attributes)
