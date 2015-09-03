var Dispatcher = require("./dispatcher");
var Constants = require("./constants");

var actions = {
	createUser: function(user){
		console.log('user created', user);
		Dispatcher.dispatch({
			actionType: Constants.CREATE_USER,
			data: user
		});
	}
};

module.exports = actions;