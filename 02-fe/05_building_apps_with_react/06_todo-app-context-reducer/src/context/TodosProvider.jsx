import { useReducer } from 'react';
import { TodosContext, todosReducer } from '.';
const TodosProvider = ({ children }) => {
	// instead of useState, we use useReducer instead
	const [todosState, todosDispatch] = useReducer(
		todosReducer /* the first argument is the dispatch function */,
		/*the second argument is the initial state. here we have consolidated our todos and filter state into a single object */
		{
			todos: JSON.parse(localStorage.getItem('todos')) || [],
			filter: 'all'
		}
	);

	return (
		<TodosContext value={{ todosState, todosDispatch }}>
			{children}
		</TodosContext>
	);
};

export default TodosProvider;
