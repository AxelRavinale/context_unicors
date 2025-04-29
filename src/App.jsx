// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UnicornProvider } from './context/UnicornContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import Home from './Home';
import UnicornRoutes from './unicorns';
import ProductsRoutes from './products';
import Navbar from './components/Navbar'; // si tenés una

const App = () => {
  return (
    <ToastProvider>
      <ThemeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
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
    </ToastProvider>
  );
};

export default App;



