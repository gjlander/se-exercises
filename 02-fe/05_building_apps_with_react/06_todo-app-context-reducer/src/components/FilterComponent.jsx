import { useTodos } from '../context';

const FilterComponent = () => {
	const {
		todosDispatch,
		todosState: { filter }
	} = useTodos();
	const setFilterInView = filter => {
		todosDispatch({ type: 'FILTER_SET', payload: filter });
	};

	return (
		<div className='mb-4 flex space-x-2'>
			<button
				onClick={() => setFilterInView('all')}
				className={`bg-gray-200 px-3 py-1 rounded ${
					filter == 'all' ? 'border-2 border-blue-500' : ''
				}`}
			>
				All
			</button>
			<button
				onClick={() => setFilterInView('active')}
				className={`bg-gray-200 px-3 py-1 rounded ${
					filter == 'active' ? 'border-2 border-blue-500' : ''
				}`}
			>
				Active
			</button>
			<button
				onClick={() => setFilterInView('completed')}
				className={`bg-gray-200 px-3 py-1 rounded ${
					filter == 'completed' ? 'border-2 border-blue-500' : ''
				}`}
			>
				Completed
			</button>
		</div>
	);
};

export default FilterComponent;
