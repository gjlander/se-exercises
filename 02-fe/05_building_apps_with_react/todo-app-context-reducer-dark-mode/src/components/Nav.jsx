import { useTodos } from '../context/context';

const Nav = () => {
    const {
        state: { isDark },
        dispatch,
    } = useTodos();

    return (
        <div>
            <label className='flex cursor-pointer gap-2'>
                <input
                    type='checkbox'
                    checked={isDark}
                    onChange={() => dispatch({ type: 'DARK_TOGGLED' })}
                />
                <span className='dark:text-white'>Dark Mode?</span>
            </label>
        </div>
    );
};

export default Nav;
