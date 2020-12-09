var Sequelize = require('sequelize-sqlite').sequelize
var sqlite    = require('sequelize-sqlite').sqlite

var sequelize = new Sequelize('database', 'username', '', {
dialect: 'sqlite',
storage: 'file:data.db'
})

var Record = sequelize.define('Record', {
name: Sequelize.STRING,
quantity: Sequelize.INTEGER
})

sequelize.sync()
.success(function(){
console.log('synced')
})

var rec = Record.build({ name: "sunny", quantity: 3 });
rec.save()
.error(function(err) {
// error callback
alert('somethings wrong')
})
.success(function() {
// success callback
console.log('inserted')
});
