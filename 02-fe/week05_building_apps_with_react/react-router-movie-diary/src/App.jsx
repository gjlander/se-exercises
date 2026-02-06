import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Details from './pages/Details';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/movie/:id' element={<Details />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
