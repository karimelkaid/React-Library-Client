import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';

import './index.css';

import Root from './routes/root';
// import Ingredients from './routes/ingredients';
// import Ingredient from './routes/ingredient';
// import Recettes from './routes/recettes';
// import Recette from './routes/recette';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <>
          <h3>Bienvenue :-)</h3>
          <p>Sélectionner une entrée du menu</p>
        </>
      },

      // ====
      // TODO: déclarer ici les routes de l'application
      // ====

    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
