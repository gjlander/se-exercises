import { useReducer } from 'react';
import { TodoContext } from './context';
import todoReducer from './reducer';
const TodoContextProvider = ({ children }) => {
	// instead of useState, we use useReducer instead
	const [todoState, todoDispatch] = useReducer(
		todoReducer /* the first argument is the dispatch function */,
		/*the second argument is the initial state. here we have consolidated our todos and filter state into a single object */
		{
			todos: JSON.parse(localStorage.getItem('todos')) || [],
			filter: 'all'
		}
	);

	return (
		<TodoContext.Provider value={{ todoState, todoDispatch }}>
			{children}
		</TodoContext.Provider>
	);
};

export default TodoContextProvider;
