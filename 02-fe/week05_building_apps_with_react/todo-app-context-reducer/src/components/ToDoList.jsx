import { useTodos } from '../context/context';
import ToDoItem from './ToDoItem';

const ToDoList = () => {
    // since our state is an object now, will both the filter and the todos, we have to do nested deconstruction
    const {
        todoState: { todos, filter },
    } = useTodos();

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'all') return true;
        if (filter === 'completed' && todo.completed) return true;
        if (filter === 'active' && !todo.completed) return true;
        return false;
    });

    return (
        <ul>
            {filteredTodos.map((todo) => (
                <ToDoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
};

export default ToDoList;
