var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});

//defining a model
var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false


	}
});

var User = sequelize.define('user', {
	email: Sequelize.STRING
});

Todo.belongsTo(User);
User.hasMany(Todo);

sequelize.sync({
//	force: true
}).then(function() {
	console.log('Everything is synced');

	User.findById(1).then(function(user){
		user.getTodos({
			where: {
				completed: false
			}
		}).then(function(todos){
			todos.forEach(function(todo){
				console.log(todo.toJSON());
			});
		})
	});
});

// 	User.create({
// 		email: 'teja@example.com'
// 	}).then(function() {
// 		return Todo.create({
// 			description: 'Clean yard'
// 		});
// 	}).then(function(todo){
// 		return User.findById(1).then(function(user){
// 			user.addTodo(todo);
// 		});
// 	});
// });