import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className='navbar bg-base-200'>
            <div className='navbar-start'>
                <a className='btn btn-ghost text-xl'>daisyUI</a>
            </div>
            <div className='navbar-center'>
                <Link to='/'>
                    <h1 className='btn btn-ghost text-4xl font-bold'>
                        AI Chatbot
                    </h1>
                </Link>
            </div>
            <div className='navbar-end'>
                <Link to='/settings'>
                    <button className='btn btn-square btn-ghost'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            className='inline-block h-5 w-5 stroke-current'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
                            ></path>
                        </svg>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
