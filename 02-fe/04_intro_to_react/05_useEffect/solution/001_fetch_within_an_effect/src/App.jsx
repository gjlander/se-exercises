import { useState, useEffect } from 'react';
import './index.css';
import { getTodos } from './data/todos';

// Download the template to get started

const App = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const abortController = new AbortController();
		(async () => {
			try {
				const allTodos = await getTodos(abortController);
				setTodos(allTodos);
			} catch (error) {
				if (error.name === 'AbortError') {
					console.log('Fetch aborted');
				} else {
					console.error(error);
				}
			}
		})();
	}, []);

	return (
		<div>
			<h1 className='text-2xl'>Todos</h1>
			<ul className='list-disc pl-5'>
				{todos.map((todo) => (
					<li key={todo.id} className={todo.completed ? 'line-through' : ''}>
						{todo.title}
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
