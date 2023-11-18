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
  // eslint-disable-next-line
  const [studentId, setstudentId] = useState(null);  

  const handleInput = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const isAdminLogin = formData.email === 'admin@gmail.com' && formData.password === 'admin';
    if (isAdminLogin) {

      localStorage.setItem('authenticatedUser', false);
      localStorage.setItem('authenticatedAdmin', true);
      navigate('/admincourses');
      window.location.reload(true);
    } else {

      // Make an API request to the login endpoint without validation
      const loginEndpoint = 'http://localhost:8081/login'; // Define the endpoint separately
      axios.post(loginEndpoint, formData)

        .then((res) => {
          const isLoginSuccessful = res.data.Status === 'Success';
          if (isLoginSuccessful) {

          
            localStorage.setItem('authenticatedUser', true);
            localStorage.setItem('authenticatedAdmin', false);
            const studentId = res.data.studentId;
            localStorage.setItem('studentId', studentId); // Store userId in localStorage
            setstudentId(studentId); 
            navigate('/', { replace: true }); // Navigate back to the home page without a full page reload
            window.location.reload(true);
          } else {
            navigate('/signup');
          }
        })
        .catch((err) =>{
          if(err){
            alert("Invalid Credentials. Please Register"); // Handle 401 status
            navigate('/signup');
            console.log(err)
          }
        })
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
            required // Add required attribute
            className="form-control"
          />
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
            required // Add required attribute
            className="form-control"
          />
        </div>
        <div className='login-signup-btns'>
          <button type="submit" className="btn btn-primary" id="login">
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="btn btn-secondary" id="signup">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
