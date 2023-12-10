import './App.scss';
import { IndexPage } from './pages/IndexPage';
import { Footer } from './components/footer/Footer';
import { NavigationMain } from './components/navigation/NavigationMain';
import React, { createContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider >
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

export default App;
