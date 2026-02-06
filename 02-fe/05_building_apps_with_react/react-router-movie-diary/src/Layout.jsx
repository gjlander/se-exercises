import { Outlet } from 'react-router-dom';
const Layout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <header>Here is the header</header>
            <div className='flex-grow'>
                <Outlet />
            </div>
            <footer>Here is the footer</footer>
        </div>
    );
};

export default Layout;
