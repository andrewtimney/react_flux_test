var React = require("react");
var Actions = require("./actions");
var Store = require("./store");
//var users = [];



// Need to initialize actions, get initial data and send to dispatcher on app start 

//users = Store.getAllUsers();

var Comment = React.createClass({
	render: function(){
		return <div><h3>{this.props.comment}</h3></div>
	}
});

var Comments = React.createClass({
	getInitialState: function(){
		return {user:'Username', users: Store.getAllUsers()};
	},
	save: function(e){
		e.preventDefault();
		var user = React.findDOMNode(this.refs.user).value.trim();
 		Actions.createUser(user);
	},
	componentWillMount: function(){
		Store.addChangeListener(this._onChange);
	},
	componentWillUnmount: function(){
		Store.removeChangeListener(this._onChange);
	},
	_onChange: function(){
		this.setState({ users: Store.getAllUsers() });
	},
	render: function(){
		var comments = this.state.users.map(function(comment){
					return <div>{comment}</div>;
				});
		return <div>
			<h2>Comments</h2>
				{comments}
			<div>
				<form onSubmit={this.save}>
				<input type="text" name="user" ref="user" />
				<input type="submit" value="Save" />
				</form>
			</div>
		</div>;
	}
});



 React.render(
	<Comments />,
	document.getElementById('main')
);