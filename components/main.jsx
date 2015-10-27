var React = require("react");
var Actions = require("../../actions/actions");
var TodoStore = require("../../stores/todo-store");

var EditableTodo = React.createClass({
	getInitialState(){
		return { IsEditing: false };
	},
	handleClick(){
		this.setState({ IsEditing: !this.state.IsEditing });
	},
	save(e){
		e.preventDefault();
		var text = React.findDOMNode(this.refs.text).value.trim();
		if(text){
			Actions.editTodo({ id: this.props.todo.id, todo: text });
			this.setState({ IsEditing: false });
		}
	},
	render: function(){
		if(this.state.IsEditing){
			return <span>
				<form onSubmit={this.save}>
					<input type="text" className="form-control"
					 defaultValue={this.props.todo.todo} ref="text"/>
				</form>
			</span>;
		}else{
			return <span onClick={this.handleClick}>
				{this.props.todo.todo}
			</span>;
		}
	}
});

var Todo = React.createClass({
	handleDelete(){
		Actions.deleteTodo(this.props.todo);
	},
	handleEdit(){
		
	},
	render: function(){
	/*//<span onClick={this.handleEdit}>
					{this.props.todo}
				</span>*/
		return <li className="list-group-item" key={this.props.key}>
				<EditableTodo todo={this.props.todo} />
				<button className="btn btn-sm btn-default pull-right"
					onClick={this.handleDelete}>
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
		if(todo){
			Actions.createTodo(todo);
			this.setState({ todo: '' });
		}
	},
	handleChange: function(event) {
    	this.setState({todo: event.target.value});
  	},
	render: function(){
		return <form onSubmit={this.save}>
				  <div className="form-group">
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
			   		return <Todo todo={todo} key={todo.id} />;
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