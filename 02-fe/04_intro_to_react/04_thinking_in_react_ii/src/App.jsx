import { useState } from 'react';
import AddToDo from './components/AddToDo';
import FilterComponent from './components/FilterComponent';
import ToDoList from './components/ToDoList';

const App = () => {
	const [todos, setTodos] = useState(
		JSON.parse(localStorage.getItem('todos')) || []
	);
	// const [todos, setTodos] = useState([]);
	const [filter, setFilter] = useState('all');

	// const toggleTodo = id => {
	// 	setTodos(prevTodos =>
	// 		prevTodos.map(todo => {
	// 			if (todo.id === id) {
	// 				return { ...todo, completed: !todo.completed };
	// 			}
	// 			return todo;
	// 		})
	// 	);
	// };

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

	const filteredTodos = todos.filter(todo => {
		if (filter === 'all') return true;
		if (filter === 'completed' && todo.completed) return true;
		if (filter === 'active' && !todo.completed) return true;
		return false;
	});

	return (
		<div className='max-w-3xl mx-auto p-4'>
			<AddToDo setTodos={setTodos} />
			<FilterComponent setFilter={setFilter} filter={filter} />
			<ToDoList todos={filteredTodos} toggleTodo={toggleTodo} />
		</div>
	);
};

export default App;
