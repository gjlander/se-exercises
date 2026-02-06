import { useTodos } from '../context/context';

const ToDoItem = ({ todo }) => {
    const { dispatch } = useTodos();
    return (
        <li className='flex items-center mb-2'>
            <input
                type='checkbox'
                checked={todo.completed}
                onChange={() =>
                    dispatch({ type: 'TODO_TOGGLED', payload: todo.id })
                }
                className='mr-2'
            />
            <p className={todo.completed ? 'line-through' : ''}>{todo.text}</p>
        </li>
    );
};

export default ToDoItem;
