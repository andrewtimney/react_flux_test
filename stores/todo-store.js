var Dispatcher = require("../dispatcher/dispatcher");
var Constants = require("../constants/constants");
var EventEmitter = require("events").EventEmitter;
var objectAssign = require("object-assign");
var _ = require('lodash');
var CHANGE_EVENT = "change";

var _todos = [{id:1, todo:'Pick up shopping'}];

var store = objectAssign({}, EventEmitter.prototype, {
	addChangeListener: function(callback){
		this.on(CHANGE_EVENT, callback);	
	},
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
	},
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	getAllTodos: function(){
		console.log('todos', _todos);
		return _todos;
	},
	getTodosById: function(id){
		return _.find(_todos, {id: id});
	}
});

Dispatcher.register(function(action){
	switch(action.actionType){
		case Constants.CREATE_TODO:
			var newId = _.max(_todos, function(todo){
				return todo.id;
			});
			_todos.push({todo:action.data, id: newId ? newId.id+1 : 1});
			store.emitChange();
			break;
		case Constants.DELETE_TODO:
			var todo = _.find(_todos, { id: action.data.id })
			_todos.splice(_todos.indexOf(todo), 1);
			store.emitChange();
			break;
		case Constants.EDIT_TODO:
			var todo = _.find(_todos, { id: action.data.id })
			todo.todo = action.data.todo;
			store.emitChange();
			break;
	}
});

module.exports = store;