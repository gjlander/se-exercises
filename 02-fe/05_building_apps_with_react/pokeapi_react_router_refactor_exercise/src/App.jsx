import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import Home from './Pages/Home';
import PokemonDetails from './Pages/PokemonDetails';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<Home />} />
            <Route path='/pokemon/:id' element={<PokemonDetails />} />
        </>
    )
);
function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
