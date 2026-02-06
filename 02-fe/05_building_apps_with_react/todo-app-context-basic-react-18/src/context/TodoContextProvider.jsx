import { useState } from 'react';
import { TodoContext } from './context';
const TodoContextProvider = ({ children }) => {
    const [todos, setTodos] = useState(
        JSON.parse(localStorage.getItem('todos')) || []
    );
    const [filter, setFilter] = useState('all');

    return (
        <TodoContext.Provider value={{ todos, setTodos, filter, setFilter }}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoContextProvider;
