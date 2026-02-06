import { useEffect, useReducer } from 'react';
import { TodoContext } from './context';
import todoReducer from './reducer';

const TodoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, {
        filter: 'all',
        todos: JSON.parse(localStorage.getItem('todos')) || [],
        isDark: JSON.parse(localStorage.getItem('theme')) || true,
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(state.todos));
    }, [state.todos]);

    return (
        <TodoContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export default TodoProvider;
