import { BrowserRouter, Routes, Route } from 'react-router';
import { MainLayout } from './layouts';
import { Home, Cart, Categories } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='categories/:category' element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
