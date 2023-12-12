import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CastPage} from './pages/CastPage';
import {ErrorPage} from './pages/ErrorPage';
import {SearchPage} from './pages/SearchPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cast/:castId",
    element: <CastPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/SearchPage",
    element: <SearchPage/>,
    errorElement: <ErrorPage/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

