import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import Item from './pages/Item';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='cart' element={<Cart />} />
            <Route path='categories/:category' element={<Categories />} />
            <Route path='store/:id' element={<Item />} />
        </Route>
    )
);

const App = () => <RouterProvider router={router} />;

export default App;
