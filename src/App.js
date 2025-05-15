import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Catalogue from './pages/Catalogue'; // your catalogue page
import BookDetail from './pages/BookDetail'; // import BookDetail component
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Root route */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/books/:bookId" element={<BookDetail />} /> {/* Book detail route */}
      </Routes>
    </Router>
  );
};

export default App;
