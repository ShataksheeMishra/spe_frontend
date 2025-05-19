import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Catalogue from './pages/Catalogue';
import BookDetail from './pages/BookDetail';
import Cart from './pages/Cart'; 
import YourOrders from './pages/YourOrders';
import Borrow from './pages/Borrow';

import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/books/:bookId" element={<BookDetail />} />
        <Route path="/cart" element={<Cart/>} /> {/* 🆕 Add cart route */}
         <Route path="/YourOrders" element={<YourOrders />} /> 
         <Route path="/borrow" element={<Borrow/>} />
      </Routes>
    </Router>
  );
};

export default App;
