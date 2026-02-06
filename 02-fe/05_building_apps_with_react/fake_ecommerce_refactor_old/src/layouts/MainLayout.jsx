import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../lib/fakeStore';

const MainLayout = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem('cart')) || []
    );
    useEffect(() => {
        getAllProducts()
            .then((array) => setProducts(array))
            .catch((err) => console.error(err));
    }, []);
    return (
        <div>
            <Navbar cart={cart} />
            <Outlet context={{ products, cart, setCart }} />
        </div>
    );
};

export default MainLayout;
