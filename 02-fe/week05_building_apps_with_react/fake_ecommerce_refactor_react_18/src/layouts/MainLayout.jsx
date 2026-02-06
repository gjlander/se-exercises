import { Outlet } from 'react-router';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
const MainLayout = () => {
    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem('cart')) || []
    );
    return (
        <div className='bg-slate-600 text-gray-300 flex flex-col min-h-screen'>
            <Navbar cart={cart} />
            <main className='flex-grow flex flex-col justify-between py-4'>
                <Outlet context={{ cart, setCart }} />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
