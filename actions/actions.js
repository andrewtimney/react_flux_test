var Dispatcher = require("../dispatcher/dispatcher");
var Constants = require("../constants/constants");

var actions = {
	createTodo: function(todo){
		console.log('todo created', todo);
		Dispatcher.dispatch({
			actionType: Constants.CREATE_TODO,
			data: todo
		});
	}
};

module.exports = actions;