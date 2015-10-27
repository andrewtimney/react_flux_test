var Dispatcher = require("../dispatcher/dispatcher");
var Constants = require("../constants/constants");

var actions = {
	createTodo: function(todo){
		Dispatcher.dispatch({
			actionType: Constants.CREATE_TODO,
			data: todo
		});
	},
	deleteTodo: function(todo){
		Dispatcher.dispatch({
			actionType: Constants.DELETE_TODO,
			data: todo
		});
	},
	editTodo: function(todo){
		Dispatcher.dispatch({
			actionType: Constants.EDIT_TODO,
			data: todo
		});
	}
};

module.exports = actions;