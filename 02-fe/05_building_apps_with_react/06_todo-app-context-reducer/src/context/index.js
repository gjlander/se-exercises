import { createContext, use } from 'react';
import TodosProvider from './TodosProvider';
import { todosReducer } from './reducers';

const TodosContext = createContext();

const useTodos = () => {
	const context = use(TodosContext);
	if (!context)
		throw new Error('useTodos must be used inside of a TodosProvider');
	return context;
};

export { TodosContext, useTodos, TodosProvider, todosReducer };
