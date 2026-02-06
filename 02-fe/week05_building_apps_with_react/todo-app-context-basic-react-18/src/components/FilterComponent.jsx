import { useTodos } from '../context/context';

const FilterComponent = () => {
    const { filter, setFilter } = useTodos();
    const setFilterInView = (filter) => {
        setFilter(filter);
    };

    return (
        <div className='mb-4 flex space-x-2'>
            <button
                onClick={() => setFilterInView('all')}
                className={`bg-gray-200 px-3 py-1 rounded ${
                    filter === 'all'
                        ? 'border-solid border-4 border-blue-500'
                        : ''
                }`}
            >
                All
            </button>
            <button
                onClick={() => setFilterInView('active')}
                className={`bg-gray-200 px-3 py-1 rounded ${
                    filter === 'active'
                        ? 'border-solid border-4 border-blue-500'
                        : ''
                }`}
            >
                Active
            </button>
            <button
                onClick={() => setFilterInView('completed')}
                className={`bg-gray-200 px-3 py-1 rounded ${
                    filter === 'completed'
                        ? 'border-solid border-4 border-blue-500'
                        : ''
                }`}
            >
                Completed
            </button>
        </div>
    );
};

export default FilterComponent;
