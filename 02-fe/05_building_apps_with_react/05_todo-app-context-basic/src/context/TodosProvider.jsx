import { useState } from 'react';
import { TodosContext } from '.';
const TodosProvider = ({ children }) => {
	const [todos, setTodos] = useState(
		JSON.parse(localStorage.getItem('todos')) || []
	);

	const [filter, setFilter] = useState('all');

	const toggleTodo = id => {
		setTodos(prevTodos => {
			const updatedTodos = prevTodos.map(todo => {
				if (todo.id === id) {
					return { ...todo, completed: !todo.completed };
				}
				return todo;
			});
			localStorage.setItem('todos', JSON.stringify(updatedTodos));
			return updatedTodos;
		});
	};

	return (
		<TodosContext value={{ todos, setTodos, toggleTodo, filter, setFilter }}>
			{children}
		</TodosContext>
	);
};

export default TodosProvider;
