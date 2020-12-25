let JSONAPISerializer = require('jsonapi-serializer').Serializer;
let userSchema  = require('../schemas/user')
let role  = require('../schemas/role')

var UserSerializer = new JSONAPISerializer('users', userSchema);

// var UserSerializer = new JSONAPISerializer('users', {
//   attributes: ['id', 'username', 'email', 'image', 'bio', 'password']
// });
let rolesData = {
  id:1,
  name: "anonymous"
}

let userData = [
  {
    id: 1,
    type: "users",
    username: "cedricpriestley",
    email: "cedricpriestley@gmail.com",
    bio: "bio",
    image: "image.jpg",
    password: "password",
    roles: rolesData
  }
];

var users = UserSerializer.serialize(userData);
module.exports = users

console.log(userData)
