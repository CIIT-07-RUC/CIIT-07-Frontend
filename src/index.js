import React, {useState, createContext,useEffect} from 'react';
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
import AccountPage from './pages/AccontPage';
const ThemeContext = createContext();


function ThemeProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('token') !== null ) {
      setIsUserLoggedIn(true);
    }
  }, [])
  

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
  },
  {
    path: "/account",
    element: <AccountPage/>,
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

