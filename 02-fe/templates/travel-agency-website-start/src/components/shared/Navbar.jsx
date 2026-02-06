const Navbar = () => {
  return (
    <div className='navbar bg-base-200 shadow-sm'>
      <div className='flex-1'>
        <a href='/' className='btn btn-ghost text-xl'>
          Travel
        </a>
      </div>
      <div className='navbar-end'>
        <ul className='menu menu-horizontal items-baseline gap-2'>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/about'>About</a>
          </li>
          <li>
            <a href='/destinations'>Destinations</a>
          </li>
          <li>
            <a href='/contact'>Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
