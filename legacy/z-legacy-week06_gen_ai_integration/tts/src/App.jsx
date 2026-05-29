import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';

import RootLayout from './layouts/RootLayout';

import Home from './pages/Home';
import Settings from './pages/Settings';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='/settings' element={<Settings />} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
