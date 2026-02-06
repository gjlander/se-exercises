import { createContext, useContext } from 'react';

const TodoContext = createContext();

const useTodos = () => {
    const context = useContext(TodoContext);
    if (!context)
        throw new Error('useTodos must be used within a TodoContextProvider');
    return context;
};

export { TodoContext, useTodos };
