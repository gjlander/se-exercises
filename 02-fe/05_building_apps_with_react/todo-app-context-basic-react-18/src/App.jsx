import TodoContextProvider from './context/TodoContextProvider';
import AddToDo from './components/AddToDo';
import FilterComponent from './components/FilterComponent';
import ToDoList from './components/ToDoList';

const App = () => {
    return (
        <TodoContextProvider>
            <div className='container mx-auto p-4'>
                <AddToDo />
                <FilterComponent />
                <ToDoList />
            </div>
        </TodoContextProvider>
    );
};

export default App;
