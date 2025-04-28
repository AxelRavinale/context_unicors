// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UnicornProvider } from './context/UnicornContext';
import { ThemeProvider } from './context/ThemeContext';
import UnicornRoutes from './unicorns';
import ProductsRoutes from './products';
import Navbar from './components/Navbar'; // si tenés una

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/unicornios/*"
            element={
              <UnicornProvider>
                <UnicornRoutes />
              </UnicornProvider>
            }
          />
          <Route path="/productos/*" element={<ProductsRoutes />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;



