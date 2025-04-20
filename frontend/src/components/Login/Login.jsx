import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // custom CSS

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', formData);
      navigate('/');
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      alert(err.response?.data?.msg || 'Error during login');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box animate__animated animate__fadeInDown">
        <h2 className="text-center mb-4">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-3" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="form-control mb-3" type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <div className="button-group">
            <button className="btn-auth">Login</button>
          </div>
          <div className="text-center">
            <span>Don't have an account? <Link to="/register">Register</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
