import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleInput = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validation
    if (formData.email === '') {
      setErrors((prev) => ({ ...prev, email: 'Email should not be empty' }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }

    if (formData.password === '') {
      setErrors((prev) => ({ ...prev, password: 'Password should not be empty' }));
    } else if (formData.password.length < 2) {
      setErrors((prev) => ({ ...prev, password: 'Password should be at least 2 characters long' }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
    if (errors.email === '' && errors.password === '') {
      axios
        .post('http://localhost:8081/login', formData)
        .then((res) => {
          if (res.data.Status === 'Success') {
            if (formData.email === "admin@gmail.com" && formData.password === "admin") {
              navigate('/admincourses');
            } else {
              navigate('/courses');
            }
          } else {
            navigate('/signup');
            alert('Invalid Credentials. Please Register');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">
            Email<span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter email"
            onChange={handleInput}
            required
            className="form-control"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password <span className="required">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter Password"
            onChange={handleInput}
            required
            className="form-control"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit" className="btn btn-primary" id="login">
          Login
        </button>
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="btn btn-secondary"
          id="signup"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Login;