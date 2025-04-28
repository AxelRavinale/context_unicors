// src/components/Navbar.jsx
import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Navbar
      bg={darkMode ? 'dark' : 'light'}
      variant={darkMode ? 'dark' : 'light'}
      expand="lg"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          🦄 UnicornApp
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/unicornios">
            Unicornios
          </Nav.Link>
          <Nav.Link as={Link} to="/productos">
            Productos
          </Nav.Link>
        </Nav>
        <Button variant={darkMode ? 'secondary' : 'outline-dark'} onClick={toggleTheme}>
          {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
        </Button>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;


