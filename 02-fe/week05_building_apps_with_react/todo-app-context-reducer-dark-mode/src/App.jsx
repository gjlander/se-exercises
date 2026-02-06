import AddToDo from './components/AddToDo';
import FilterComponent from './components/FilterComponent';
import ToDoList from './components/ToDoList';
import Nav from './components/Nav';
import { useTodos } from './context/context';

const App = () => {
    const {
        state: { isDark },
    } = useTodos();
    return (
        <div
            className={`p-4 min-h-screen w-screen dark:bg-slate-600 ${
                isDark && 'dark'
            }`}
        >
            <Nav />
            <AddToDo />
            <FilterComponent />
            <ToDoList />
        </div>
    );
};

export default App;
