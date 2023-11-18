import React, { useState } from "react";
import axios from 'axios';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        dob: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: ''
    });

    const [errors, setErrors] = useState({}); // Initialize empty errors object

    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;

        // Update the corresponding field's value
        setValues((prev) => ({ ...prev, [name]: value }));
    }

    const validate = () => {
        let newErrors = {};

        // Required fields
        if (!values.firstname) {
            newErrors.firstname = 'First Name is required';
        }
        if (!values.lastname) {
            newErrors.lastname = 'Last Name is required';
        }
        if (!values.dob) {
            newErrors.dob = 'Date of Birth is required';
        }
        if (!values.email) {
            newErrors.email = 'Email is required';
        }
        if (!values.phone) {
            newErrors.phone = 'Phone is required';
        }
        if (!values.password) {
            newErrors.password = 'Password is required';
        }
        if (!values.confirm_password) {
            newErrors.confirm_password = 'Confirm Password is required';
        }

        // Password must be at least 8 characters
        if (values.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        // Phone must be exactly 10 digits
        if (values.phone.length !== 10) {
            newErrors.phone = 'Phone must be exactly 10 digits';
        }

        // Check if password and confirm password match
        if (values.password !== values.confirm_password) {
            newErrors.confirm_password = 'Passwords do not match';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // If no errors, form is valid
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate the form
        if (validate()) {
            // Proceed with the POST request
            axios.post('http://localhost:8081/signup', values)
                .then(res => {
                    navigate("/login");
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center p-4 w-100 signupHead'>
                <strong>Register</strong>
            </div>
            <br />
            <div className='d-flex justify-content-center align-items-center vh-90 SignupPage'>
                <div className='p-1 rounded w-25 signupForm'>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <input
                                type="text"
                                id="firstname"
                                placeholder='Enter First Name'
                                name='firstname'
                                value={values.firstname}
                                onChange={handleInput}
                                className='form-control rounded-0'
                                autoComplete='off'
                            />
                            {errors.firstname && <p className="text-danger">{errors.firstname}</p>}
                        </div>
                        <div className='mb-3'>
                            <input
                                type="text"
                                id="lastname"
                                placeholder='Enter Last Name'
                                name='lastname'
                                value={values.lastname}
                                onChange={handleInput}
                                className='form-control rounded-0'
                                autoComplete='off'
                            />
                            {errors.lastname && <p className="text-danger">{errors.lastname}</p>}
                        </div>
                        <div className='mb-3'>
                            <input
                                type="date"
                                id="dob"
                                name='dob'
                                value={values.dob}
                                onChange={handleInput}
                                className='form-control rounded-0'
                            />
                            {errors.dob && <p className="text-danger">{errors.dob}</p>}
                        </div>
                        <div className='mb-3'>
                            <input
                                type="email"
                                id="email"
                                placeholder='Enter email'
                                name='email'
                                value={values.email}
                                onChange={handleInput}
                                className='form-control rounded-0'
                                autoComplete='off'
                            />
                            {errors.email && <p className="text-danger">{errors.email}</p>}
                        </div>
                        <div className='mb-3'>
                            <input
                                type="text"
                                id="phone"
                                placeholder='Enter Mobile number'
                                name='phone'
                                value={values.phone}
                                onChange={handleInput}
                                className='form-control rounded-0'
                                autoComplete='off'
                            />
                            {errors.phone && <p className="text-danger">{errors.phone}</p>}
                        </div>
                        <div className='mb-3'>
                            <input
                                type="password"
                                id="password"
                                placeholder='Password'
                                name='password'
                                value={values.password}
                                onChange={handleInput}
                                className='form-control rounded-0'
                            />
                            {errors.password && <p className="text-danger">{errors.password}</p>}
                        </div>
                        <div className='mb-3'>
                            <input
                                type="password"
                                id="confirm_password"
                                placeholder='Confirm Password'
                                name='confirm_password'
                                value={values.confirm_password}
                                onChange={handleInput}
                                className='form-control rounded-0'
                            />
                            {errors.confirm_password && <p className="text-danger">{errors.confirm_password}</p>}
                        </div>
                        <div>
                            <div className='col'>
                            <button type='submit' className='btn btn-success w-100 rounded-0'>Submit</button>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <p>Already a user?</p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <Link to='/login' type="button" id='signupLink' className="btn btn-primary rounded-0">Login</Link>
                            </div>
                            <Outlet />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;
