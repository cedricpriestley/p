var DataTypes = require("sequelize").DataTypes;
var _permission = require("./permission");
var _role = require("./role");
var _role_permission = require("./role_permission");
var _user = require("./user");
var _user_role = require("./user_role");

function initModels(sequelize) {
  var permission = _permission(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var role_permission = _role_permission(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_role = _user_role(sequelize, DataTypes);

  role_permission.belongsTo(role, { foreignKey: "role_id"});
  role.hasMany(role_permission, { foreignKey: "role_id"});
  role_permission.belongsTo(permission, { foreignKey: "permission_id"});
  permission.hasMany(role_permission, { foreignKey: "permission_id"});
  user_role.belongsTo(user, { foreignKey: "user_id"});
  user.hasMany(user_role, { foreignKey: "user_id"});
  user_role.belongsTo(role, { foreignKey: "role_id"});
  role.hasMany(user_role, { foreignKey: "role_id"});

  return {
    permission,
    role,
    role_permission,
    user,
    user_role,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
