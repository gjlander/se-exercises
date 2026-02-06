import { createContext, use } from 'react';
import TodosProvider from './TodosProvider';

const TodosContext = createContext();

const useTodos = () => {
	const context = use(TodosContext);
	if (!context)
		throw new Error('useTodos must be used inside of a TodosProvider');
	return context;
};

export { TodosContext, useTodos, TodosProvider };
