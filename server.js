var express = require('express');
var app = express();
var PORT =  process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Meet dad for lunch',
	completed: false
}, {
	id: 2,
	description: 'Go to Market',
	completed: false
}, {
	id: 3,
	description: 'car wash',
	completed: true
}];

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
	var matchedTodo;
	//Iterate over todos array. find the match.
	todos.forEach(function (todo){
		if(todoId === todo.id){
		matchedTodo = todo; 
		
		}
	});

		if(matchedTodo){
			res.json(matchedTodo);	
		}else{
			res.status(404).send();
		}



	// for(var i = 0; i < todos.length; i++){
	// 	if (todos[i].id === todoId){
	// 		res.json(todos[i]);
	// 	}
	// }
	
});

app.listen(PORT, function(){
	console.log('Express listening on port '+PORT+'!');
});
