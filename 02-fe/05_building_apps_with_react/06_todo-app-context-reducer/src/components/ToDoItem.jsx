import { useTodos } from '../context';

const ToDoItem = ({ todo }) => {
	const { todosDispatch } = useTodos();

	const toggleTodo = id => {
		todosDispatch({ type: 'TODO_TOGGLED', payload: id });
	};
	return (
		<li className='flex items-center mb-2'>
			<label>
				<input
					type='checkbox'
					checked={todo.completed}
					onChange={() => toggleTodo(todo.id)}
					className='mr-2'
				/>
				{todo.text}
			</label>
		</li>
	);
};

export default ToDoItem;
