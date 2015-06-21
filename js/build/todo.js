( function() {

	var TodoApp = React.createClass( {displayName: "TodoApp",
		getInitialState: function() {

			// Load todo list from localStorage
			// else use default
			return {
				"todos": localStorage.todos ?
				JSON.parse( localStorage.todos ) :
				[
					{
						"name": "Today",
						"color": "rgba(255,255,255,0.1)",
						"list": [
							{ "todo": "todo1", "done": false },
							{ "todo": "todo2", "done": false }
						]
					},
					{
						"name": "Monday",
						"color": "rgba(255,255,255,0.1)",
						"list": [
							{ "todo": "todo1", "done": false },
							{ "todo": "todo2", "done": false }
						]
					},
					{
						"name": "Tuesday",
						"color": "rgba(255,255,255,0.1)",
						"list": [
							{ "todo": "todo1", "done": false },
							{ "todo": "todo2", "done": false }
						]
					},
					{
						"name": "Wednesday",
						"color": "rgba(255,255,255,0.1)",
						"list": [
							{ "todo": "todo1", "done": false },
							{ "todo": "todo2", "done": false }
						]
					},
					{
						"name": "Thursday",
						"color": "rgba(255,255,255,0.1)",
						"list": [
							{ "todo": "todo1", "done": false },
							{ "todo": "todo2", "done": false }
						]
					},
					{
						"name": "Friday",
						"color": "rgba(255,255,255,0.1)",
						"list": [
							{ "todo": "todo1", "done": false },
							{ "todo": "todo2", "done": false }
						]
					},
					{
						"name": "Saturday",
						"color": "rgba(255,255,255,0.1)",
						"list": [
							{ "todo": "todo1", "done": false },
							{ "todo": "todo2", "done": false }
						]
					},
					{
						"name": "Sunday",
						"color": "rgba(255,255,255,0.1)",
						"list": [
							{ "todo": "todo1", "done": false },
							{ "todo": "todo2", "done": false }
						]
					}
				]
			};

		},
		handleSaveToStorage: function( e ) {

			// to local storage
			var todos = JSON.stringify( this.state.todos );

			localStorage.setItem( "todos", todos );

		},
		handleSaveAsFile: function( e ) {

			// as file
			var todos = JSON.stringify( this.state.todos );
			var blob = new Blob(
				[ todos ],
				{ "type": "text/plain;charset=utf-8" }
			);

			// Uses FileSaver.js
			// https://github.com/eligrey/FileSaver.js
			saveAs( blob, "todos.txt" );

		},
		handleLoadFromFile: function( e ) {

			var fileInput = e.target.files[ 0 ];
			var textType = /text.*/;
			var todos = "";

			if ( fileInput.type.match( textType ) ) {

				var reader = new FileReader();

				reader.onload = function( e ) {

					todos = JSON.parse( reader.result );

					this.setState( { "todos": todos } );

				}.bind( this );

				reader.readAsText( fileInput );

			} else {

				alert( "File not supported!" );

			}

		},
		handleNewTodoBox: function( todoLabel ) {

			var newTodos = this.state.todos.concat( [
				{
					name: todoLabel,
					color: "rgba(255,255,255,0.1)",
					list: [
						{ "todo": "todo1", "done": false },
						{ "todo": "todo2", "done": false }
					]
				}
			] );

			this.setState( { "todos": newTodos } );

		},
		handleRemoveTodoBox: function( todoLabel ) {

			var newTodos = this.state.todos.slice();
			var indexOfTodoToRemove = null;

			newTodos.forEach( function( todoInfo, i ) {

				if ( todoInfo.name === todoLabel ) {

					indexOfTodoToRemove = i;

				}

			} );

			newTodos.splice( indexOfTodoToRemove, 1 );

			this.setState( { "todos": newTodos } );

		},
		handleNewTodoItem: function( todoLabel, todo ) {

			var newTodos = this.state.todos.slice();

			newTodos.forEach( function( todoInfo ) {

				if ( todoInfo.name === todoLabel ) {

					todoInfo.list = todoInfo.list.concat( [
						{ "todo": todo, "done": false }
					] );

				}

			} );

			this.setState( { "todos": newTodos } );

		},
		handleRemoveTodoItem: function( todoLabel, todo ) {

			var newTodos = this.state.todos.slice();

			newTodos.forEach( function( todoInfo ) {

				if ( todoInfo.name === todoLabel ) {

					var newListForTodo = todoInfo.list.slice();
					var indexOfTodoItemToRemove = null;

					newListForTodo.forEach( function( todoItem, i ) {

						if ( todoItem.todo === todo.todo ) {

							indexOfTodoItemToRemove = i;

						}

					} );

					newListForTodo.splice( indexOfTodoItemToRemove, 1 );

					todoInfo.list = newListForTodo;

				}

			} );

			this.setState( { "todos": newTodos } );

		},
		handleColorChange: function( name, color ) {

			var newTodos = this.state.todos.slice();

			newTodos.forEach( function( todo ) {

				if ( todo.name === name ) {

					todo.color = "#" + color;

				}

			} );

			this.setState( { "todos": newTodos } );

		},
		render: function() {

			return (
				React.createElement("div", null, 
					React.createElement(TodoMenu, {onSaveToStorage:  this.handleSaveToStorage, 
						onSaveAsFile:  this.handleSaveAsFile, 
						onLoadFromFile:  this.handleLoadFromFile, 
						onNewTodoBox:  this.handleNewTodoBox}), 
					React.createElement(TodoBoxes, {todos:  this.state.todos, 
						onRemoveTodoBox:  this.handleRemoveTodoBox, 
						onNewTodoItem:  this.handleNewTodoItem, 
						onRemoveTodoItem:  this.handleRemoveTodoItem, 
						handleColorChange:  this.handleColorChange})
				)
			);

		}
	} );

	var TodoMenu = React.createClass( {displayName: "TodoMenu",
		onSaveToStorage: function( e ) {

			this.props.onSaveToStorage( e );

		},
		onSaveAsFile: function( e ) {

			this.props.onSaveAsFile( e );

		},
		onLoadFromFile: function( e ) {

			this.props.onLoadFromFile( e );

		},
		onNewTodoBox: function( e ) {

			e.preventDefault();

			var todoLabelInput = this.refs.todoLabel.getDOMNode();
			var todoLabel = todoLabelInput.value.trim();

			this.props.onNewTodoBox( todoLabel );

			todoLabelInput.value = "";

		},
		render: function() {

			return (
				React.createElement("div", {className: "todo-menu-container pure-form"}, 
					React.createElement("label", {for: "load-file-input"}, 
						React.createElement("i", {className: "fa fa-upload"}), 
						React.createElement("input", {type: "file", 
							id: "load-file-input", 
							className: "pure-button pure-button-primary", 
							onChange:  this.onLoadFromFile, 
							ref: "loadTodoFileInput"})
					), 
					React.createElement("button", {id: "save-storage-button", 
						className: "pure-button pure-button-primary", 
						onClick:  this.onSaveToStorage}, 
						React.createElement("i", {className: "fa fa-floppy-o"}), 
						"> Local Storage"
					), 
					React.createElement("button", {id: "save-file-button", 
						className: "pure-button pure-button-primary", 
						onClick:  this.onSaveAsFile}, 
						React.createElement("i", {className: "fa fa-floppy-o"}), 
						"> File"
					), 
					React.createElement("form", {id: "add-todo-box-form", 
						onSubmit:  this.onNewTodoBox}, 
						React.createElement("input", {type: "text", ref: "todoLabel", 
							placeholder: "Add new todo list"})
					)
				)
			);

		}
	} );

	var TodoBoxes = React.createClass( {displayName: "TodoBoxes",
		render: function() {

			var onRemoveTodoBox = this.props.onRemoveTodoBox;
			var onNewTodoItem = this.props.onNewTodoItem;
			var onRemoveTodoItem = this.props.onRemoveTodoItem;
			var handleColorChange = this.props.handleColorChange;
			var todoBoxes = this.props.todos.map(
				function( todo ) {
					return (
						React.createElement(TodoBox, {
							todo: todo, 
							onRemoveTodoBox: onRemoveTodoBox, 
							onNewTodoItem: onNewTodoItem, 
							onRemoveTodoItem: onRemoveTodoItem, 
							handleColorChange: handleColorChange })
					);
				}
			);

			return (
				React.createElement("div", {className: "todo-list-container pure-g"}, 
					todoBoxes 
				)
			);

		}
	} );

	var TodoBox = React.createClass( {displayName: "TodoBox",
		getInitialState: function() {

			return {
				showControls: false
			};

		},
		getMinHeight: function( list ) {

			return 70 + ( list.length * 25 );

		},
		handleUpdateTodoBoxSize: function() {

			var todoBoxDiv = this.refs.todoBox.getDOMNode();
			var todoList = this.props.todo.list;

			$( todoBoxDiv ).resizable( "option", "minHeight",
				this.getMinHeight( todoList ) );

		},
		showControls: function() {

			this.setState( { "showControls": true } );

		},
		hideControls: function() {

			this.setState( { "showControls": false } );

		},
		render: function() {

			var todoData = this.props.todo;
			var todoBoxStyle = {
				"background-color": todoData.color
			};

			return (
				React.createElement("div", {ref: "todoBox", 
					style: todoBoxStyle, 
					className: "todo-box pure-u-1-3", 
					onMouseEnter:  this.showControls, 
					onMouseLeave:  this.hideControls}, 
					React.createElement(TodoForm, {name:  todoData.name, 
						showControls:  this.state.showControls, 
						onRemoveTodoBox:  this.props.onRemoveTodoBox, 
						onNewTodoItem:  this.props.onNewTodoItem, 
						updateTodoBoxSize:  this.handleUpdateTodoBoxSize, 
						handleColorChange:  this.props.handleColorChange}), 
					React.createElement(TodoList, {name:  todoData.name, 
						list:  todoData.list, 
						onRemoveTodoItem:  this.props.onRemoveTodoItem})
				)
			);

		},
		componentDidMount: function() {

			var todoBoxDiv = this.refs.todoBox.getDOMNode();

			$( todoBoxDiv ).resizable( {
				minHeight: this.getMinHeight( this.props.todo.list )
			} );

		}
	} );

	var TodoForm = React.createClass( {displayName: "TodoForm",
		getInitialState: function() {

			return {
				showControls: false
			};

		},
		onRemoveTodoBox: function() {

			var props = this.props;
			var todoLabel = props.name;

			props.onRemoveTodoBox( todoLabel );

		},
		handleSubmit: function( e ) {

			e.preventDefault();

			var todoLabel = this.props.name;
			var newTodo = this.refs.newTodo.getDOMNode().value.trim();

			this.props.onNewTodoItem( todoLabel, newTodo );
			this.props.updateTodoBoxSize();

			this.refs.newTodo.getDOMNode().value = "";

		},
		showControls: function() {

			this.setState( { "showControls": true } );

		},
		hideControls: function() {

			this.setState( { "showControls": false } );

		},
		render: function() {

			var removeButtonClass = this.state.showControls ?
				"fa fa-minus-square" : "hide";
			var formClass = this.props.showControls ?
				"todo-item-add-form pure-form" : "hide";

			return (
				React.createElement("div", {className: "todo-label", 
					onMouseEnter:  this.showControls, 
					onMouseLeave:  this.hideControls}, 
					React.createElement("i", {className: removeButtonClass, 
						onClick:  this.onRemoveTodoBox}
					), 
					 this.props.name, 
					React.createElement("input", {className: "color colorPicker", 
						ref: "colorPicker"}), 
					React.createElement("form", {className: formClass, 
						onSubmit:  this.handleSubmit}, 
						React.createElement("input", {type: "text", ref: "newTodo", 
							className: "todo-add-input pure-input-1", 
							placeholder: "add new item"})
					)
				)
			);

		},
		componentDidMount: function() {

			var colorPickerInput = this.refs.colorPicker.getDOMNode();

			colorPickerInput.onchange = this.handleColorChange;

		},
		handleColorChange: function( e ) {

			this.props.handleColorChange( this.props.name, e.target.value );

		}
	} );

	var TodoList = React.createClass( {displayName: "TodoList",
		render: function() {

			var todoLabel = this.props.name;
			var onRemoveTodoItem = this.props.onRemoveTodoItem;
			var todos = this.props.list.map(
				function( todo ) {
					return (
						React.createElement("li", null, 
							React.createElement(TodoItem, {name: todoLabel, 
								todo: todo, 
								onRemoveTodoItem: onRemoveTodoItem })
						)
					);
				}
			);

			return (
				React.createElement("div", {className: "todo-list"}, 
					React.createElement("ul", null, 
						todos 
					)
				)
			);

		}
	} );

	var TodoItem = React.createClass( {displayName: "TodoItem",
		getInitialState: function() {

			return {
				isDone: this.props.todo.done,
				showRemoveButton: false
			};

		},
		onChange: function( e ) {

			this.setState( {
				isDone: !this.state.isDone
			} );

		},
		handleRemoveTodoItem: function( e ) {

			e.preventDefault();

			var todoLabel = this.props.name;
			var todo = this.props.todo;

			this.props.onRemoveTodoItem( todoLabel, todo );

		},
		showRemoveButton: function() {

			this.setState( { "showRemoveButton": true } );

		},
		hideRemoveButton: function() {

			this.setState( { "showRemoveButton": false } );

		},
		render: function() {

			var todoInfo = this.props.todo;
			var removeButtonClass = this.state.showRemoveButton ?
				"todo-item-remove-button" : "hide";

			return (
				React.createElement("div", {className: "todo-item", 
					onMouseEnter:  this.showRemoveButton, 
					onMouseLeave:  this.hideRemoveButton}, 
					React.createElement("input", {type: "checkbox", 
						checked:  this.state.isDone, 
						onChange:  this.onChange}), 
					React.createElement("div", {className: "todo-item-info"}, 
						 todoInfo.todo
					), 
					React.createElement("button", {id: "todo-item-remove-button", 
						className: removeButtonClass, 
						onClick:  this.handleRemoveTodoItem}, 
						React.createElement("i", {className: "fa fa-minus-square"})
					)
				)
			);

		}
	} );

	React.render(
		React.createElement(TodoApp, null),
		document.getElementById( "app" )
	);

} )( );
