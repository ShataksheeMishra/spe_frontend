import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Catalogue from './pages/Catalogue'; // assuming you have a Catalogue page
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Root route */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/catalogue" element={<Catalogue />} />
      </Routes>
    </Router>
  );
};

export default App;
