var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT =  process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('Todo API Root');
});

//GET /todos
app.get('/todos', function(req, res){
res.json(todos);
});
//GET /todos/:id
app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});	//underscore lib substitution for the code
	// var matchedTodo;
	// //Iterate over todos array. find the match.
	// todos.forEach(function (todo){
	// 	if(todoId === todo.id){
	// 	matchedTodo = todo; 
		
	// 	}
	// });

		if(matchedTodo){
			res.json(matchedTodo);	
		}else{
			res.status(404).send();
		}
	});



	// for(var i = 0; i < todos.length; i++){
	// 	if (todos[i].id === todoId){
	// 		res.json(todos[i]);
	// 	}
	// }
	


app.post('/todos', function(req, res){
	var body = _.pick(req.body,'description','completed');

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){	// runs if body.completed is not a boolean and description is not a String
		return res.status(400).send();
	}


	body.description = body.description.trim();
	//add id field
	body.id = todoNextId++;


	//push body into array
	todos.push(body);

	res.json(body);
});

	
app.delete('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if(!matchedTodo){
		res.status(404).json({"error": "no todo found with that id"});
	}else{
	todos = _.without(todos, matchedTodo);
	res.json(matchedTodo);
}

});


app.listen(PORT, function(){
	console.log('Express listening on port '+PORT+'!');
});
