

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); 
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
     
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/catalogue')}>Catalogue</Nav.Link>
            <Nav.Link onClick={() => navigate('/YourOrders')}>My Orders</Nav.Link>
            <Nav.Link onClick={() => navigate('/borrow')}>My Borrows</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
       
    </Navbar>
  );
};

export default NavigationBar;
