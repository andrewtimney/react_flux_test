var Dispatcher = require("../dispatcher/dispatcher");
var Constants = require("../constants/constants");

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