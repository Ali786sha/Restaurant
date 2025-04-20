import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', formData);
      // alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error during registration');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box animate__animated animate__fadeInDown">
        <h2 className="text-center mb-4">Join Our Team</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-3" type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input className="form-control mb-3" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="form-control mb-3" type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <div className="button-group">
             <button className="btn-auth">Register</button>
          </div>
          <div className="text-center">
            <span>Already have an account? <Link to="/login">Login</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
