import AddToDo from './components/AddToDo';
import FilterComponent from './components/FilterComponent';
import ToDoList from './components/ToDoList';
import { TodosProvider } from './context';

const App = () => {
	return (
		<TodosProvider>
			<div className='max-w-3xl mx-auto p-4'>
				<AddToDo />
				<FilterComponent />
				<ToDoList />
			</div>
		</TodosProvider>
	);
};

export default App;
