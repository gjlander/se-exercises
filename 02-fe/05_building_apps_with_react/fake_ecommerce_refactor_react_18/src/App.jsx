import { BrowserRouter, Routes, Route } from 'react-router';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Categories from './pages/Categories';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='cart' element={<Cart />} />
                    <Route
                        path='categories/:category'
                        element={<Categories />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
