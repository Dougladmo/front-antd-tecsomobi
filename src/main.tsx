import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home/Home.js';
import ErrorPage from './pages/Error/PageNotFound.js';
import AdminPage from './pages/Admin/AdminPage.js';

import './index.css';
import MapPage from './pages/Map/MapPage.js';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/pontos-de-recarga",
        element: <MapPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);