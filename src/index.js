import React, {useState, createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CastPage} from './pages/CastPage';
import {ErrorPage} from './pages/ErrorPage';
import {SearchPage} from './pages/SearchPage';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { NavigationMain } from './components/navigation/NavigationMain';
import { Footer } from './components/footer/Footer';
import { IndexPage } from './pages/IndexPage';

import './App.scss';
const ThemeContext = createContext();


function ThemeProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <ThemeContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
      {children}
    </ThemeContext.Provider>
  );
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage/>,
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
    <ThemeProvider>
        <RouterProvider router={router} >
        </RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);

export {ThemeContext};

