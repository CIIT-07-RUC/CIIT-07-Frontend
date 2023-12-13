import './App.scss';
import { IndexPage } from './pages/IndexPage';
import { Footer } from './components/footer/Footer';
import { NavigationMain } from './components/navigation/NavigationMain';
import React, { createContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <ThemeContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
      {children}
    </ThemeContext.Provider>
  );
}

function App() {
  return (
    <ThemeProvider>
			<NavigationMain offCanvasPlacement="end" />
      <IndexPage/>
      <Footer />
    </ThemeProvider>
  );
}

export {ThemeContext, App};
