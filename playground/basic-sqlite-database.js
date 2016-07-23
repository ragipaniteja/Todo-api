var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': 'basic-sqlite-database.sqlite'
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

sequelize.sync({
	//force: true
}).then(function() {
	console.log('Everything is synced');

	Todo.findById(3).then(function(todo){
		if (todo) {
		
			console.log(todo.toJSON());

	} else {
		console.log('No todo found');
	}
});
});




// 	Todo.create({
// 		description: 'Take out Trash',
// 	}).then(function(todo) {
// 		return Todo.create({
// 			description: 'Clean Office'
// 		});

// 	}).then(function() {
// 		//return Todo.findById(1)
// 		return Todo.findAll({
// 			where: {
// 				description: {
// 					$like: '%trash%'
// 				}
// 			}
// 		});
// 	}).then(function(todos) {
// 		if (todos) {
// 			todos.forEach(function(todo) {
// 				console.log(todo.toJSON());
// 			})

// 		} else {
// 			console.log('No todo found');
// 		}
// 	}).catch(function(e) {
// 		console.log(e);
// 	});
// });