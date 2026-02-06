# WBS Spinner Galore

Welcome, students! You are given a React App structured as follows:

```
.
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── src
│   ├── App.jsx
│   ├── components
│   ├── data
│   ├── index.css
│   ├── layouts
│   ├── main.jsx
│   └── pages
└── vite.config.js
```

React Router is already installed and configured in Data Mode in `App.jsx`:

```jsx
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import { MainLayout } from './layouts';
import { Home, NotFound } from './pages';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
```

## What You Need to Do

### 1. Create Page Components

In `src/pages`, create the following components:

- `PokemonList` – Renders a list of 150 Pokémon from the PokéAPI.
- `Pokemon` – Renders a single Pokémon from the PokéAPI.
- `Posts` – Renders a list of 100 posts from JSONPlaceholder.
- `Post` – Renders a single post from JSONPlaceholder.

Export all your pages from `src/pages/index.js` and configure the routes in `App.jsx`.

### 2. Create Loaders

In `src/data/index.js`, create data loaders for each of your pages and attach them to the corresponding route.

### 3. Configure Routes

For each route, you must:

- Pass an `errorElement` – Use the `ErrorElement` component from `src/components`.
- Pass a `hydrateFallbackElement` – Use the `Loading` component from `src/components`.

### 4. Implement Page Logic

On each page:

- Retrieve data using the loader.
- Wrap your content with React's `Suspense`.
- Create a reusable component that:

  - Uses the `use` hook to consume the data.
  - Is placed in `src/components` and properly exported.
