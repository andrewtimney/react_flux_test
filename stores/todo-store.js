var Dispatcher = require("../dispatcher/dispatcher");
var Constants = require("../constants/constants");
var EventEmitter = require("events").EventEmitter;
var objectAssign = require("object-assign");
var _ = require('lodash');
var CHANGE_EVENT = "change";

var _todos = ['Go Home'];

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
		return _todos;
	},
	getTodosById: function(id){
		return _.find(_todos, {id: id});
	}
});

Dispatcher.register(function(action){
	switch(action.actionType){
		case Constants.CREATE_TODO:
			_todos.push(action.data);
			store.emitChange();
			break;
	}
});

module.exports = store;