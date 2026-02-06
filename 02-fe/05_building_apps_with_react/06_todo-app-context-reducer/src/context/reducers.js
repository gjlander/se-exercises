// our reducer takes the current state (like prev in a setter callback function), and an action object
const todosReducer = (state, action) => {
	// traditionally a switch statement is used to apply the logic we want based on the action.type
	switch (action.type) {
		// here we add the same logic we had for adding a new todo
		case 'TODO_ADDED': {
			// since our state is an object, we spread it, and only update the todos property
			const newState = {
				...state,
				// the other property on the action in called 'payload' by convention. This has the updated value we want to use
				todos: [
					{ id: Date.now(), text: action.payload, completed: false },
					...state.todos
				]
			};
			// we only want to store the todos in state, so we dot notate
			localStorage.setItem('todos', JSON.stringify(newState.todos));
			return newState;
		}
		// logic for setting the filter
		case 'FILTER_SET': {
			// since we're not saving the filter to local storage, this one is pretty simple
			return {
				...state,
				filter: action.payload
			};
		}
		case 'TODO_TOGGLED': {
			const newState = {
				...state,
				todos: state.todos.map(todo => {
					if (todo.id === action.payload) {
						return { ...todo, completed: !todo.completed };
					}
					return todo;
				})
			};
			localStorage.setItem('todos', JSON.stringify(newState.todos));
			return newState;
		}
		// in case a non-existing action is given, we default to simply returning the state as it currently exists
		default:
			return state;
	}
};

export { todosReducer };
