import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticatedAdmin');
    if (isAuthenticated === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const [formValues, setFormValues] = useState({
    name: '',
  });

  const [userData, setUserData] = useState({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    dob: '',
    phone: '',
    password: '',
    profilePic: '',
  });

  useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    if (studentId) {
      axios
        .get(`https://student-hub-portal.onrender.com/students/${studentId}`)
        .then((response) => {
          if (response.data.Status === 'Success') {
            setUserData(response.data.data);
            setFormValues((prev) => ({
              ...prev,
              name: `${response.data.data.firstname} ${response.data.data.lastname}`,
            }));
          } else {
            console.error('Error fetching user data');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data: ', error);
        });
    }
  }, []);

  const navigate = useNavigate(); // Access the navigation function

  const navigationData = [
    {
      navName: 'Home',
      navRoute: '/home',
    },
    {
      navName: 'Courses',
      navRoute: isAdmin ? '/admincourses' : `/courses`,
    },
    {
      navName: 'Academic Resources',
      navRoute: '/resources',
    },
    {
      navName: 'Communication Tools',
      navRoute: isAdmin ? '/admintools' : `/tools`,
    },
    {
      navName: 'Calendar',
      navRoute: '/calendar',
    },
    {
      navName: isAdmin ? '' : 'Progress Tracker',
      navRoute: isAdmin ? '' : `/progress/${formValues.name}`,
    },
    {
      navName: 'Report',
      navRoute: '/report',
    },
  ];

  useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    if (studentId) {
      fetch(`https://student-hub-portal.onrender.com/students/${studentId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.Status === 'Success') {
            setUserData(data.data); // Assuming the API response structure contains student data
          } else {
            console.error('Error fetching student data.');
          }
        })
        .catch((error) => console.error('Error fetching student data: ', error));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('studentId'); // Clear studentId from local storage
    navigate('/',{ replace: false }); // Navigate to the login page
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('authenticatedAdmin');
  };

  return (
    <div className="nav-main">
      <div className="nav-wrapper">
        <div className="nav-profile">
          <div className="profile-img">
            {userData.id ? (
              <NavLink to="/profile" className="nav-profile-link">
                <img className="image" src={`https://student-hub-portal.onrender.com${userData.profilePic}`} alt="profilepic" />
              </NavLink>
            ) : (
              <img
                className="image"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="profilepic"
              />
            )}
          </div>
          {userData.id ? (
            <div className="user-name">
              {userData.firstname}
            </div>
          ) : (
            <a href="/" className="user-name-button">
              {isAdmin ? 'Admin' : 'Login'}
            </a>
          )}
        </div>
        <div className="nav-links">
          {navigationData
            .filter((item) => !!item.navName) // Filter out items with empty navName
            .map((data, index) => (
              <NavLink
                className="nav-names"
                key={index}
                to={data.navRoute}
                activeClassName="active"
              >
                {data.navName}
              </NavLink>
            ))}
        </div>
        <div className="nav-logout" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
}

export default Navbar;
