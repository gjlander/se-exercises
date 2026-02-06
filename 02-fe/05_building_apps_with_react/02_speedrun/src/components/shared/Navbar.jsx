import { Link } from 'react-router';

const Navbar = () => {
  return (
    <div className='navbar bg-base-200 shadow-sm'>
      <div className='flex-1'>
        <Link to='/' className='btn btn-ghost text-xl'>
          Your Movie Database
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
