import { Link, NavLink } from 'react-router';

const Navbar = () => {
  const showActive = ({ isActive }) => (isActive ? 'menu-active' : '');
  return (
    <div className='navbar bg-base-200 shadow-sm'>
      <div className='flex-1'>
        <Link to='/' className='btn btn-ghost text-xl'>
          Travel
        </Link>
      </div>
      <div className='navbar-end'>
        <ul className='menu menu-horizontal items-baseline gap-2'>
          <li>
            <NavLink to='/' className={showActive}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' className={showActive}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to='/destinations' className={showActive}>
              Destinations
            </NavLink>
          </li>
          <li>
            <NavLink to='/contact' className={showActive}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
