import React, { useState } from 'react';
import { signup } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';

const SignUp = () => {
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form.first_name, form.last_name, form.email, form.password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.userId);
      navigate('/catalogue');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} />
        <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Sign Up</button>
        <p className="redirect-login">
          Already have an account? <span onClick={() => navigate('/')} className="login-link">Log in</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
