import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import { MainLayout } from './layouts';
import { Home, NotFound, Pokemon, PokemonList, Post, Posts } from './pages';
import { loadPokemon } from './data';
import { ErrorElement, Loading } from './components';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path='pokemon'
          element={<PokemonList />}
          loader={loadPokemon}
          errorElement={<ErrorElement />}
          hydrateFallbackElement={<Loading message='Loading pokemon' />}
        />
        <Route path='pokemon/:id' element={<Pokemon />} />
        <Route path='posts' element={<Posts />} />
        <Route path='posts/:id' element={<Post />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
