"use strict";

var React = require("react");
var Actions = require("./actions");
var Store = require("./store");
//var users = [];

// Need to initialize actions, get initial data and send to dispatcher on app start

//users = Store.getAllUsers();

var Comment = React.createClass({
	displayName: "Comment",

	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h3",
				null,
				this.props.comment
			)
		);
	}
});

var Comments = React.createClass({
	displayName: "Comments",

	getInitialState: function getInitialState() {
		return { user: 'Username', users: Store.getAllUsers() };
	},
	save: function save(e) {
		e.preventDefault();
		var user = React.findDOMNode(this.refs.user).value.trim();
		Actions.createUser(user);
	},
	componentWillMount: function componentWillMount() {
		Store.addChangeListener(this._onChange);
	},
	componentWillUnmount: function componentWillUnmount() {
		Store.removeChangeListener(this._onChange);
	},
	_onChange: function _onChange() {
		this.setState({ users: Store.getAllUsers() });
	},
	render: function render() {
		var comments = this.state.users.map(function (comment) {
			return React.createElement(
				"div",
				null,
				comment
			);
		});
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h2",
				null,
				"Comments"
			),
			comments,
			React.createElement(
				"div",
				null,
				React.createElement(
					"form",
					{ onSubmit: this.save },
					React.createElement("input", { type: "text", name: "user", ref: "user" }),
					React.createElement("input", { type: "submit", value: "Save" })
				)
			)
		);
	}
});

React.render(React.createElement(Comments, null), document.getElementById('main'));