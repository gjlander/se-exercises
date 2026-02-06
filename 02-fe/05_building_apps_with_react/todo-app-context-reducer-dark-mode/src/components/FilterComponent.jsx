import { useTodos } from '../context/context';

const FilterComponent = () => {
    const { dispatch } = useTodos();

    const setFilterInView = (filter) => {
        console.log(filter);

        dispatch({ type: 'FILTER_SET', payload: filter });
    };

    return (
        <div className='mb-4 flex space-x-2'>
            <button
                onClick={() => setFilterInView('all')}
                className='bg-gray-200 px-3 py-1 rounded'
            >
                All
            </button>
            <button
                onClick={() => setFilterInView('active')}
                className='bg-gray-200 px-3 py-1 rounded'
            >
                Active
            </button>
            <button
                onClick={() => setFilterInView('completed')}
                className='bg-gray-200 px-3 py-1 rounded'
            >
                Completed
            </button>
        </div>
    );
};

export default FilterComponent;
