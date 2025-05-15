// src/pages/Login.js
import React, { useState } from 'react';
import { login } from '../api/auth';  
import { useNavigate } from 'react-router-dom'; 
import '../styles/Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form.email, form.password);
      // localStorage.setItem('token', res.token);
      navigate('/catalogue');  // Redirect after successful login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={form.email} 
          onChange={handleChange} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={form.password} 
          onChange={handleChange} 
        />
        <button type="submit">Log In</button>
        {/* Navigate to Sign Up page when clicked */}
      <p className="redirect-signup">
        Don't have an account?{' '}
        <span 
          onClick={() => navigate('/signup')}  // Use navigate to go to Sign Up page
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          Sign Up
        </span>
      </p>
      </form>

      
    </div>
  );
};

export default Login;
