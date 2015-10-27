var React = require("react");
var Actions = require("../../actions/actions");
var TodoStore = require("../../stores/todo-store");

var Todo = React.createClass({
	handleClick(){
		Actions.deleteTodo(this.props.todo);
	},
	render: function(){
		return <li className="list-group-item">
				{this.props.todo}
				<button className="btn btn-sm btn-default pull-right"
					onClick={this.handleClick}>
					X
				</button>
			   </li>;
	}
});

var Create = React.createClass({
	getInitialState(){
		return { todo: '' };
	},
	save(e){
		e.preventDefault();
		var todo = React.findDOMNode(this.refs.todo).value.trim();
		Actions.createTodo(todo);
		this.setState({ todo: '' });
	},
	handleChange: function(event) {
    	this.setState({todo: event.target.value});
  	},
	render: function(){
		return <form onSubmit={this.save}>
				  <div class="form-group">
				  	<div className="input-group">
					<input type="text" name="todo" ref="todo" value={this.state.todo}
					  onChange={this.handleChange} className="form-control" placeholder="Add a Todo" />
					  <span className="input-group-btn">
					  	<input type="submit" value="Add" className="btn btn-default" />
					  </span>
					</div>
				  </div>
			   </form>;
	}
});

var Todos = React.createClass({
	getInitialState: function(){
		return {todos: TodoStore.getAllTodos()};
	},
	componentWillMount: function(){
		TodoStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function(){
		TodoStore.removeChangeListener(this._onChange);
	},
	_onChange: function(){
		this.setState({ todos: TodoStore.getAllTodos() });
	},
	render: function(){
		return <div>	
			   <h3>Todo</h3>
			   <ul className="list-group">
			    {this.state.todos.map(function(todo){
			   		return <Todo todo={todo} />;
			    })}
			   </ul>
			   <Create />
			   </div>;
	}
});

 React.render(
	<Todos />,
	document.getElementById('main')
);