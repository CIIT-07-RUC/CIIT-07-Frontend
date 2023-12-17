import React, {useState, createContext,useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CastPage} from './pages/CastPage';
import {MoviePage} from './pages/MoviePage';
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
import { FullCastPage } from './pages/FullCastPage';
import { BookmarksPage } from './pages/BookmarksPage';
const ThemeContext = createContext();


function ThemeProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userEmail, setUserEmail] = useState(0);

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  useEffect(() => {
    if (sessionStorage.getItem('token') !== null ) {
      setIsUserLoggedIn(true);
      const jwt = parseJwt(sessionStorage.getItem('token'));
      setUserId(jwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
      setUserEmail(jwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'])
    }
  }, [])
  

  return (
    <ThemeContext.Provider value={{ 
      isUserLoggedIn, 
      setIsUserLoggedIn, 
      userId, 
      setUserId,
      userEmail,
      setUserEmail
      }}>
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
    path: "/movie/:movieId",
    element: <MoviePage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/SearchPage/:query",
    element: <SearchPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/account",
    element: <AccountPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/fullcast/:castId",
    element: <FullCastPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/bookmarks",
    element: <BookmarksPage/>,
    errorElement: <ErrorPage/>
  },
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

